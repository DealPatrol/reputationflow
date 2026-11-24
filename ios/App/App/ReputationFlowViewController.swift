import UIKit
import Capacitor

/// Root view controller. Registers the app's own native plugin (StoreKit 2, Face ID, QR, share sheet),
/// which lives in this target rather than in an npm package.
class ReputationFlowViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(ReputationFlowNativePlugin())
    }
}
