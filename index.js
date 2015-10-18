module.exports = each

function each (stream, fn) {
  var waiting = false
  stream.on('readable', onreadable)
  read(null)
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
