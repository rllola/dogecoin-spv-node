const CompactSize = require('../utils/compactSize')
const PROTOCOL_VERSION = require('../constants').PROTOCOL_VERSION

// https://bitcoin.org/en/developer-reference#getblocks
// getHeaders is similar to getBlock
function encodeGetblocksMessage (blockHash, lastHash) {
  const hashCount = blockHash.length

  const buffer = Buffer.alloc(4 + 32 + hashCount + hashCount * 32)
  let offset = 0

  // Encode version
  offset = buffer.writeInt32LE(PROTOCOL_VERSION, offset, true)

  // How many hashes we send
  const compactSizeBuffer = CompactSize.fromSize(hashCount)
  compactSizeBuffer.copy(buffer, offset)
  offset += compactSizeBuffer.length

  for (let i = 0; i < hashCount; i++) {
    const blockHashBuffer = Buffer.from(blockHash[i], 'hex')
    blockHashBuffer.copy(buffer, offset)
    offset += blockHashBuffer.length
  }

  // Stop hash is full of zeroes which means send me MAX_LIMIT
  const stopHashBuffer = Buffer.from(lastHash, 'hex')
  stopHashBuffer.copy(buffer, offset)

  return buffer
}

module.exports = { encodeGetblocksMessage }
