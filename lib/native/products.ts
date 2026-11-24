/** App Store Connect product identifiers for the auto-renewing "ReputationFlow Professional" group. */
export const IOS_PRO_MONTHLY = "com.colecollins.reputationflow.pro.monthly"
export const IOS_PRO_YEARLY = "com.colecollins.reputationflow.pro.yearly"
export const IOS_PRO_PRODUCT_IDS = [IOS_PRO_MONTHLY, IOS_PRO_YEARLY] as const
export const IOS_BUNDLE_ID = "com.colecollins.reputationflow"

export function isIosProProduct(productId: unknown): productId is (typeof IOS_PRO_PRODUCT_IDS)[number] {
  return typeof productId === "string" && (IOS_PRO_PRODUCT_IDS as readonly string[]).includes(productId)
}
