const CompactSize = require('../utils/compactSize')
const { decodeTxMessage } = require('./tx')

function decodeBlockMessage (payload) {
  const block = {}
  let offset = 0

  block.blockHeader = payload.slice(offset, offset + 80).toString('hex')
  offset += 80

  const compactSize = CompactSize.fromBuffer(payload, offset)
  offset += compactSize.offset

  block.txnCount = compactSize.size

  block.txn = []
  for (let i = 0; i < block.txnCount; i++) {
    const tx = decodeTxMessage(payload.slice(offset, payload.length))
    offset += tx.size

    block.txn[i] = tx
  }

  return block
}

module.exports = { decodeBlockMessage }
