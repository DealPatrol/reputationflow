import { execFileSync } from "node:child_process"
import { createPrivateKey, sign, X509Certificate } from "node:crypto"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { AppStoreVerificationError, entitlementFromTransaction, verifyAppleJws } from "@/lib/app-store"

/** Builds a throwaway ES256 chain shaped like Apple's (root -> WWDR-style intermediate -> leaf, with marker OIDs). */
let dir = ""
let chain: string[] = []
let leafKeyPem = ""
let rootFingerprint = ""

function openssl(args: string[]) {
  execFileSync("openssl", args, { cwd: dir, stdio: "pipe" })
}

function derBase64(file: string) {
  return new X509Certificate(readFileSync(join(dir, file))).raw.toString("base64")
}

function makeJws(payload: object, opts: { x5c?: string[]; alg?: string } = {}) {
  const header = Buffer.from(JSON.stringify({ alg: opts.alg ?? "ES256", x5c: opts.x5c ?? chain })).toString("base64url")
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = sign("sha256", Buffer.from(`${header}.${body}`), { key: createPrivateKey(leafKeyPem), dsaEncoding: "ieee-p1363" })
  return `${header}.${body}.${signature.toString("base64url")}`
}

const trust = () => ({ trustedRootFingerprints: [rootFingerprint] })

const tx = {
  bundleId: "com.colecollins.reputationflow",
  productId: "com.colecollins.reputationflow.pro.monthly",
  transactionId: "2000000001",
  originalTransactionId: "2000000000",
  expiresDate: Date.now() + 30 * 86400000,
  appAccountToken: "8B0C1D2E-0000-4000-8000-000000000001",
  environment: "Sandbox",
}

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "rf-appstore-"))
  writeFileSync(join(dir, "int.ext"), "basicConstraints=critical,CA:TRUE\nkeyUsage=critical,keyCertSign,cRLSign\n1.2.840.113635.100.6.2.1=ASN1:NULL\n")
  writeFileSync(join(dir, "leaf.ext"), "basicConstraints=critical,CA:FALSE\nkeyUsage=critical,digitalSignature\n1.2.840.113635.100.6.11.1=ASN1:NULL\n")
  for (const name of ["root", "int", "leaf"]) openssl(["ecparam", "-name", "prime256v1", "-genkey", "-noout", "-out", `${name}.key`])
  openssl(["req", "-x509", "-new", "-key", "root.key", "-subj", "/CN=Test Root", "-days", "30", "-out", "root.pem"])
  openssl(["req", "-new", "-key", "int.key", "-subj", "/CN=Test WWDR", "-out", "int.csr"])
  openssl(["x509", "-req", "-in", "int.csr", "-CA", "root.pem", "-CAkey", "root.key", "-CAcreateserial", "-days", "30", "-extfile", "int.ext", "-out", "int.pem"])
  openssl(["req", "-new", "-key", "leaf.key", "-subj", "/CN=Test Signing", "-out", "leaf.csr"])
  openssl(["x509", "-req", "-in", "leaf.csr", "-CA", "int.pem", "-CAkey", "int.key", "-CAcreateserial", "-days", "30", "-extfile", "leaf.ext", "-out", "leaf.pem"])
  chain = [derBase64("leaf.pem"), derBase64("int.pem"), derBase64("root.pem")]
  leafKeyPem = readFileSync(join(dir, "leaf.key"), "utf8")
  rootFingerprint = new X509Certificate(readFileSync(join(dir, "root.pem"))).fingerprint256
})

afterAll(() => {
  if (dir) rmSync(dir, { recursive: true, force: true })
})

describe("App Store JWS verification", () => {
  it("accepts a correctly signed transaction from a trusted chain", () => {
    const payload = verifyAppleJws(makeJws(tx), trust())
    expect(payload).toMatchObject({ productId: tx.productId, originalTransactionId: "2000000000" })
  })

  it("rejects chains that do not end at Apple Root CA - G3 by default", () => {
    expect(() => verifyAppleJws(makeJws(tx))).toThrow(AppStoreVerificationError)
  })

  it("rejects a tampered payload", () => {
    const [h, , s] = makeJws(tx).split(".")
    const forged = Buffer.from(JSON.stringify({ ...tx, expiresDate: Date.now() + 9e12 })).toString("base64url")
    expect(() => verifyAppleJws(`${h}.${forged}.${s}`, trust())).toThrow("signature")
  })

  it("rejects the wrong algorithm, a short chain, and a reordered chain", () => {
    expect(() => verifyAppleJws(makeJws(tx, { alg: "HS256" }), trust())).toThrow("algorithm")
    expect(() => verifyAppleJws(makeJws(tx, { x5c: chain.slice(0, 2) }), trust())).toThrow("chain")
    expect(() => verifyAppleJws(makeJws(tx, { x5c: [chain[1], chain[0], chain[2]] }), trust())).toThrow(AppStoreVerificationError)
  })

  it("rejects certificates outside their validity window", () => {
    expect(() => verifyAppleJws(makeJws(tx), { ...trust(), now: new Date(Date.now() + 365 * 86400000) })).toThrow("expired")
  })

  it("rejects garbage", () => {
    expect(() => verifyAppleJws("abc", trust())).toThrow(AppStoreVerificationError)
    expect(() => verifyAppleJws("a.b.c", trust())).toThrow(AppStoreVerificationError)
  })
})

describe("App Store entitlement decision", () => {
  it("is active until expiry and lowercases the account token", () => {
    const e = entitlementFromTransaction(tx)
    expect(e.active).toBe(true)
    expect(e.appAccountToken).toBe(tx.appAccountToken.toLowerCase())
    expect(entitlementFromTransaction({ ...tx, expiresDate: Date.now() - 1000 }).active).toBe(false)
  })

  it("is inactive after a refund or revocation", () => {
    expect(entitlementFromTransaction({ ...tx, revocationDate: Date.now() - 1000 }).active).toBe(false)
  })

  it("rejects other apps and unknown products", () => {
    expect(() => entitlementFromTransaction({ ...tx, bundleId: "com.example.other" })).toThrow("different app")
    expect(() => entitlementFromTransaction({ ...tx, productId: "com.colecollins.reputationflow.lifetime" })).toThrow("Unknown product")
  })
})
