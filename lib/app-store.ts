import { X509Certificate, verify as cryptoVerify } from "node:crypto"
import { IOS_BUNDLE_ID, isIosProProduct } from "@/lib/native/products"

/**
 * Verifies App Store signed data (StoreKit 2 `jwsRepresentation` and App Store Server
 * Notifications V2 `signedPayload`) without third-party SDKs.
 *
 * Checks: ES256 JWS, x5c chain leaf -> Apple WWDR intermediate -> Apple Root CA - G3 (pinned by
 * SHA-256 fingerprint), certificate validity, Apple marker OIDs, and the signature itself.
 */

/** SHA-256 of https://www.apple.com/certificateauthority/AppleRootCA-G3.cer (valid until 2039-04-30). */
export const APPLE_ROOT_CA_G3_SHA256 =
  "63:34:3A:BF:B8:9A:6A:03:EB:B5:7E:9B:3F:5F:A7:BE:7C:4F:5C:75:6F:30:17:B3:A8:C4:88:C3:65:3E:91:79"

// DER-encoded OIDs Apple uses to mark App Store receipt signing certificates.
const LEAF_MARKER_OID = Buffer.from("060a2a864886f76364060b01", "hex") // 1.2.840.113635.100.6.11.1
const INTERMEDIATE_MARKER_OID = Buffer.from("060a2a864886f76364060201", "hex") // 1.2.840.113635.100.6.2.1

export class AppStoreVerificationError extends Error {}

export interface VerifyOptions {
  /** Override for tests only. Production always pins Apple Root CA - G3. */
  trustedRootFingerprints?: string[]
  /** Skip Apple marker OID checks. Tests only. */
  skipMarkerOids?: boolean
  now?: Date
}

function b64urlJson<T>(segment: string): T {
  return JSON.parse(Buffer.from(segment, "base64url").toString("utf8")) as T
}

export function verifyAppleJws<T = Record<string, unknown>>(jws: string, options: VerifyOptions = {}): T {
  if (typeof jws !== "string") throw new AppStoreVerificationError("Signed data is missing")
  const parts = jws.split(".")
  if (parts.length !== 3) throw new AppStoreVerificationError("Signed data is not a JWS")
  const [headerSegment, payloadSegment, signatureSegment] = parts

  let header: { alg?: string; x5c?: string[] }
  try {
    header = b64urlJson(headerSegment)
  } catch {
    throw new AppStoreVerificationError("JWS header is unreadable")
  }
  if (header.alg !== "ES256") throw new AppStoreVerificationError("Unexpected JWS algorithm")
  if (!Array.isArray(header.x5c) || header.x5c.length !== 3) {
    throw new AppStoreVerificationError("JWS certificate chain is missing")
  }

  let leaf: X509Certificate, intermediate: X509Certificate, root: X509Certificate
  try {
    ;[leaf, intermediate, root] = header.x5c.map((der) => new X509Certificate(Buffer.from(der, "base64")))
  } catch {
    throw new AppStoreVerificationError("JWS certificate chain is unreadable")
  }

  const pinned = (options.trustedRootFingerprints ?? [APPLE_ROOT_CA_G3_SHA256]).map((f) => f.toUpperCase())
  if (!pinned.includes(root.fingerprint256.toUpperCase())) {
    throw new AppStoreVerificationError("JWS is not signed by Apple")
  }
  if (!root.verify(root.publicKey) || !intermediate.verify(root.publicKey) || !leaf.verify(intermediate.publicKey)) {
    throw new AppStoreVerificationError("JWS certificate chain is invalid")
  }
  if (!intermediate.ca || !intermediate.checkIssued(root) || !leaf.checkIssued(intermediate)) {
    throw new AppStoreVerificationError("JWS certificate chain is invalid")
  }
  const now = (options.now ?? new Date()).getTime()
  for (const cert of [leaf, intermediate, root]) {
    if (now < Date.parse(cert.validFrom) || now > Date.parse(cert.validTo)) {
      throw new AppStoreVerificationError("JWS certificate is expired")
    }
  }
  if (!options.skipMarkerOids) {
    if (!leaf.raw.includes(LEAF_MARKER_OID) || !intermediate.raw.includes(INTERMEDIATE_MARKER_OID)) {
      throw new AppStoreVerificationError("JWS certificate is not an App Store certificate")
    }
  }

  const signature = Buffer.from(signatureSegment, "base64url")
  const ok = cryptoVerify(
    "sha256",
    Buffer.from(`${headerSegment}.${payloadSegment}`),
    { key: leaf.publicKey, dsaEncoding: "ieee-p1363" },
    signature,
  )
  if (!ok) throw new AppStoreVerificationError("JWS signature is invalid")

  try {
    return b64urlJson<T>(payloadSegment)
  } catch {
    throw new AppStoreVerificationError("JWS payload is unreadable")
  }
}

/** Subset of JWSTransactionDecodedPayload used here. */
export interface AppleTransaction {
  bundleId?: string
  productId?: string
  transactionId?: string
  originalTransactionId?: string
  expiresDate?: number
  revocationDate?: number
  appAccountToken?: string
  environment?: string
  type?: string
}

export interface AppleEntitlement {
  originalTransactionId: string
  transactionId: string
  productId: string
  expiresAt: Date | null
  revokedAt: Date | null
  environment: string
  appAccountToken: string | null
  active: boolean
}

/** Validates a decoded transaction belongs to this app and product group, and decides if it is active. */
export function entitlementFromTransaction(tx: AppleTransaction, now = new Date()): AppleEntitlement {
  if (tx.bundleId !== IOS_BUNDLE_ID) throw new AppStoreVerificationError("Transaction is for a different app")
  if (!isIosProProduct(tx.productId)) throw new AppStoreVerificationError("Unknown product")
  if (!tx.originalTransactionId || !tx.transactionId) throw new AppStoreVerificationError("Transaction id is missing")
  const expiresAt = typeof tx.expiresDate === "number" ? new Date(tx.expiresDate) : null
  const revokedAt = typeof tx.revocationDate === "number" ? new Date(tx.revocationDate) : null
  const active = !revokedAt && expiresAt !== null && expiresAt.getTime() > now.getTime()
  return {
    originalTransactionId: String(tx.originalTransactionId),
    transactionId: String(tx.transactionId),
    productId: tx.productId,
    expiresAt,
    revokedAt,
    environment: tx.environment || "Production",
    appAccountToken: typeof tx.appAccountToken === "string" ? tx.appAccountToken.toLowerCase() : null,
    active,
  }
}

/** Notification types (App Store Server Notifications V2) that can change access. */
export interface AppleNotificationPayload {
  notificationType?: string
  subtype?: string
  data?: { bundleId?: string; signedTransactionInfo?: string; environment?: string }
}
