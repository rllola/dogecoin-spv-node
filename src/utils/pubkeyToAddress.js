const bs58check = require('bs58check')
const RIPEMD160 = require('ripemd160')
const crypto = require('crypto')

function pubkeyToAddress (pubkey, networkByte, hash = false, redeemScriptHash = false) {
  let pubKeyHash = pubkey

  if (!hash) {
    pubKeyHash = crypto.createHash('sha256').update(pubkey).digest()
    pubKeyHash = new RIPEMD160().update(pubKeyHash).digest()
  }

  // TODO: Testnet parameter
  networkByte = Buffer.from(networkByte, 'hex')

  if (redeemScriptHash) {
    networkByte = Buffer.from('c4', 'hex')
  }

  const temp = Buffer.concat([networkByte, pubKeyHash])

  return bs58check.encode(temp)
}

module.exports = pubkeyToAddress
