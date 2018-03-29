const CompactSize = require('../utils/compactSize')

function decodeRejectMessage (payload) {
  var rejectMessage = {}
  let offset = 0

  var compactSize = CompactSize.fromBuffer(payload, offset)

  rejectMessage.messageLength = compactSize.size
  offset = compactSize.offset

  var message = payload.slice(offset, offset + rejectMessage.messageLength)

  rejectMessage.message = message.toString()
  offset += rejectMessage.messageLength

  rejectMessage.code = payload.slice(offset, offset + 1).toString('hex')
  offset += 1

  compactSize = CompactSize.fromBuffer(payload, offset)

  rejectMessage.reasonLength = compactSize.size
  offset += compactSize.offset

  var reason = payload.slice(offset, offset + rejectMessage.reasonLength)

  rejectMessage.reason = reason.toString()
  offset += rejectMessage.reasonLength

  if (payload.length - offset > 0) {
    rejectMessage.extraData = payload.slice(offset, payload.length).toString()
  }

  return rejectMessage
}

module.exports = { decodeRejectMessage }