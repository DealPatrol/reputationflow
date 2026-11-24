import Foundation
import UIKit
import Capacitor
import StoreKit
import LocalAuthentication
import CoreImage
import CoreImage.CIFilterBuiltins

/// ReputationFlow native bridge (JS name: "ReputationFlowNative"; see lib/native/bridge.ts).
///
/// - StoreKit 2 auto-renewing subscriptions (App Review Guideline 3.1.1): products, purchase with an
///   appAccountToken, restore, current entitlements, Transaction.updates, and Apple's manage sheet.
///   Signed transactions (JWS) go to the server, which verifies them against Apple's root certificate.
/// - App lock with Face ID / Touch ID / device passcode (LocalAuthentication).
/// - Review QR codes drawn on device with CoreImage, so they work with no signal.
/// - The iOS share sheet (Messages, Mail, AirDrop, Save Image, Print) for links, scripts, and files.
@objc(ReputationFlowNativePlugin)
public class ReputationFlowNativePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ReputationFlowNativePlugin"
    public let jsName = "ReputationFlowNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "currentEntitlements", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "manageSubscriptions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "biometryInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "qrCode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "share", returnType: CAPPluginReturnPromise),
    ]

    private var updatesTask: Task<Void, Never>?
    private let ciContext = CIContext()

    override public func load() {
        // Renewals, Ask to Buy approvals, refunds, and purchases on other devices arrive here.
        updatesTask = Task.detached { [weak self] in
            for await result in Transaction.updates {
                guard case .verified(let transaction) = result else { continue }
                await transaction.finish()
                let payload = ReputationFlowNativePlugin.transactionJSON(transaction, jws: result.jwsRepresentation)
                self?.notifyListeners("transactionsUpdated", data: ["transactions": [payload]])
            }
        }
    }

    deinit { updatesTask?.cancel() }

    // MARK: - StoreKit 2

    static func transactionJSON(_ transaction: Transaction, jws: String) -> [String: Any] {
        var json: [String: Any] = [
            "productId": transaction.productID,
            "jws": jws,
            "originalTransactionId": String(transaction.originalID),
        ]
        if let expiration = transaction.expirationDate {
            json["expirationDate"] = expiration.timeIntervalSince1970 * 1000
        }
        return json
    }

    static func currentEntitlementJSON() async -> [[String: Any]] {
        var items: [[String: Any]] = []
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result, transaction.revocationDate == nil {
                items.append(transactionJSON(transaction, jws: result.jwsRepresentation))
            }
        }
        return items
    }

    private static func periodName(_ unit: Product.SubscriptionPeriod.Unit) -> String {
        switch unit {
        case .day: return "day"
        case .week: return "week"
        case .month: return "month"
        case .year: return "year"
        @unknown default: return "month"
        }
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        let ids = call.getArray("productIds", String.self) ?? []
        Task {
            do {
                let products = try await Product.products(for: ids)
                var list: [[String: Any]] = []
                for product in products {
                    var item: [String: Any] = [
                        "id": product.id,
                        "displayName": product.displayName,
                        "description": product.description,
                        "displayPrice": product.displayPrice,
                        "price": NSDecimalNumber(decimal: product.price).doubleValue,
                    ]
                    if let subscription = product.subscription {
                        let period = subscription.subscriptionPeriod
                        item["period"] = period.value == 1 ? (ReputationFlowNativePlugin.periodName(period.unit) as Any) : (NSNull() as Any)
                        if let offer = subscription.introductoryOffer, await subscription.isEligibleForIntroOffer {
                            let unit = ReputationFlowNativePlugin.periodName(offer.period.unit)
                            let length = "\(offer.period.value) \(unit)\(offer.period.value == 1 ? "" : "s")"
                            item["introductoryOffer"] = offer.paymentMode == .freeTrial
                                ? "\(length) free, then \(product.displayPrice)"
                                : "\(offer.displayPrice) for \(length)"
                        }
                    }
                    list.append(item)
                }
                call.resolve(["products": list])
            } catch {
                call.reject("Could not load App Store products: \(error.localizedDescription)")
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId") else {
            call.reject("productId is required")
            return
        }
        var options: Set<Product.PurchaseOption> = []
        if let token = call.getString("appAccountToken"), let uuid = UUID(uuidString: token) {
            options.insert(.appAccountToken(uuid))
        }
        Task { @MainActor in
            do {
                guard let product = try await Product.products(for: [productId]).first else {
                    call.reject("This plan is not available in the App Store yet.")
                    return
                }
                let result = try await product.purchase(options: options)
                switch result {
                case .success(let verification):
                    switch verification {
                    case .verified(let transaction):
                        await transaction.finish()
                        call.resolve([
                            "status": "purchased",
                            "transaction": ReputationFlowNativePlugin.transactionJSON(transaction, jws: verification.jwsRepresentation),
                        ])
                    case .unverified(_, let error):
                        call.reject("The App Store could not verify this purchase: \(error.localizedDescription)")
                    }
                case .userCancelled:
                    call.resolve(["status": "cancelled"])
                case .pending:
                    call.resolve(["status": "pending"])
                @unknown default:
                    call.resolve(["status": "unknown"])
                }
            } catch {
                call.reject("Purchase failed: \(error.localizedDescription)")
            }
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        Task {
            // AppStore.sync() can show an Apple Account sign-in sheet; report what we have even if it is dismissed.
            do { try await AppStore.sync() } catch { CAPLog.print("AppStore.sync: \(error.localizedDescription)") }
            call.resolve(["transactions": await ReputationFlowNativePlugin.currentEntitlementJSON()])
        }
    }

    @objc func currentEntitlements(_ call: CAPPluginCall) {
        Task { call.resolve(["transactions": await ReputationFlowNativePlugin.currentEntitlementJSON()]) }
    }

    @objc func manageSubscriptions(_ call: CAPPluginCall) {
        Task { @MainActor in
            guard let scene = self.bridge?.viewController?.view.window?.windowScene else {
                call.reject("No active window")
                return
            }
            do {
                try await AppStore.showManageSubscriptions(in: scene)
                call.resolve()
            } catch {
                call.reject("Could not open subscriptions: \(error.localizedDescription)")
            }
        }
    }

    // MARK: - App lock

    @objc func biometryInfo(_ call: CAPPluginCall) {
        let context = LAContext()
        var error: NSError?
        let available = context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error)
        let type: String
        switch context.biometryType {
        case .faceID: type = "faceId"
        case .touchID: type = "touchId"
        default:
            if #available(iOS 17.0, *), context.biometryType == .opticID { type = "opticId" } else { type = "passcode" }
        }
        call.resolve(["available": available, "type": type])
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        let reason = call.getString("reason") ?? "Unlock ReputationFlow"
        let context = LAContext()
        context.localizedCancelTitle = "Cancel"
        context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { ok, error in
            if ok {
                call.resolve(["ok": true])
            } else {
                call.resolve(["ok": false, "error": error?.localizedDescription ?? "cancelled"])
            }
        }
    }

    // MARK: - QR code (CoreImage, offline)

    @objc func qrCode(_ call: CAPPluginCall) {
        guard let text = call.getString("text"), !text.isEmpty, text.utf8.count <= 2048 else {
            call.reject("text is required")
            return
        }
        let size = CGFloat(min(max(call.getInt("size") ?? 1024, 256), 2048))
        let filter = CIFilter.qrCodeGenerator()
        filter.message = Data(text.utf8)
        filter.correctionLevel = "M"
        guard let output = filter.outputImage else {
            call.reject("Could not create the QR code")
            return
        }
        // 4-module quiet zone on a white background so phone cameras read it reliably.
        let modules = output.extent.width + 8
        let scale = floor(size / modules)
        let scaled = output.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
        guard let cgImage = ciContext.createCGImage(scaled, from: scaled.extent) else {
            call.reject("Could not render the QR code")
            return
        }
        let side = modules * scale
        let format = UIGraphicsImageRendererFormat()
        format.scale = 1
        format.opaque = true
        let image = UIGraphicsImageRenderer(size: CGSize(width: side, height: side), format: format).image { ctx in
            UIColor.white.setFill()
            ctx.fill(CGRect(x: 0, y: 0, width: side, height: side))
            ctx.cgContext.interpolationQuality = .none
            UIImage(cgImage: cgImage).draw(in: CGRect(x: 4 * scale, y: 4 * scale, width: scaled.extent.width, height: scaled.extent.height))
        }
        guard let png = image.pngData() else {
            call.reject("Could not encode the QR code")
            return
        }
        call.resolve(["base64": png.base64EncodedString()])
    }

    // MARK: - Share sheet

    @objc func share(_ call: CAPPluginCall) {
        var items: [Any] = []
        let text = call.getString("text")
        if let text = text, !text.isEmpty {
            items.append(ShareTextItem(text: text, subject: call.getString("subject")))
        }
        if let urlString = call.getString("url"), let url = URL(string: urlString), url.scheme == "https",
           !(text ?? "").contains(urlString) {
            items.append(url)
        }
        if let b64 = call.getString("imageBase64"), let data = Data(base64Encoded: b64), let image = UIImage(data: data) {
            items.append(image)
        }
        if let b64 = call.getString("fileBase64"), let data = Data(base64Encoded: b64) {
            let raw = call.getString("filename") ?? "reputationflow-file"
            let safe = raw.replacingOccurrences(of: "[^A-Za-z0-9._-]", with: "_", options: .regularExpression)
            let name = String((safe.isEmpty ? "reputationflow-file" : safe).prefix(80))
            let dir = FileManager.default.temporaryDirectory.appendingPathComponent("share", isDirectory: true)
            do {
                try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
                let fileURL = dir.appendingPathComponent(name)
                try data.write(to: fileURL, options: .atomic)
                items.append(fileURL)
            } catch {
                call.reject("Could not prepare the file: \(error.localizedDescription)")
                return
            }
        }
        guard !items.isEmpty else {
            call.reject("Nothing to share")
            return
        }
        DispatchQueue.main.async {
            guard let presenter = self.bridge?.viewController else {
                call.reject("No active window")
                return
            }
            let sheet = UIActivityViewController(activityItems: items, applicationActivities: nil)
            sheet.completionWithItemsHandler = { activityType, completed, _, _ in
                call.resolve(["completed": completed, "activityType": activityType.map { $0.rawValue as Any } ?? NSNull()])
            }
            if let popover = sheet.popoverPresentationController {
                popover.sourceView = presenter.view
                popover.sourceRect = CGRect(x: presenter.view.bounds.midX, y: presenter.view.bounds.maxY - 80, width: 1, height: 1)
                popover.permittedArrowDirections = []
            }
            presenter.present(sheet, animated: true)
        }
    }
}

/// Text for the share sheet with an email subject line (used by Mail).
final class ShareTextItem: NSObject, UIActivityItemSource {
    let text: String
    let subject: String?

    init(text: String, subject: String?) {
        self.text = text
        self.subject = subject
    }

    func activityViewControllerPlaceholderItem(_ activityViewController: UIActivityViewController) -> Any { text }

    func activityViewController(_ activityViewController: UIActivityViewController, itemForActivityType activityType: UIActivity.ActivityType?) -> Any? { text }

    func activityViewController(_ activityViewController: UIActivityViewController, subjectForActivityType activityType: UIActivity.ActivityType?) -> String {
        subject ?? ""
    }
}
