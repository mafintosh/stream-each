var eos = require('end-of-stream')

module.exports = each

function each (stream, fn, cb) {
  var waiting = false
  var error = null
  var ended = false

  stream.on('readable', onreadable)
  read(null)
  if (cb) eos(stream, {readable: true, writable: false}, done)
  return stream

  function done (err) {
    error = err
    ended = true
    if (waiting) return cb(error)
  }

  function onreadable () {
    if (waiting) read(null)
  }

  function read (err) {
    if (err) {
      waiting = true
      stream.destroy(err)
      return
    }
    var data = stream.read()
    waiting = !data
    if (waiting && ended) return cb(error)
    if (data) fn(data, read)
  }
}
