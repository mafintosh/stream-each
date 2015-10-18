var eos = require('end-of-stream')

module.exports = each

function each (stream, fn, cb) {
  var waiting = false
  stream.on('readable', onreadable)
  read(null)
  if (cb) eos(stream, {readable: true, writable: false}, cb)
  return stream

  function onreadable () {
    if (waiting) read(null)
  }

  function read (err) {
    if (err) return stream.destroy(err)
    var data = stream.read()
    waiting = !data
    if (data) fn(data, read)
  }
}
