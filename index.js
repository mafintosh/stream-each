module.exports = each

function each (stream, fn) {
  var want = false
  stream.on('readable', onreadable)
  loop(null)
  return stream

  function onreadable () {
    if (want) loop(null)
  }

  function loop (err) {
    if (err) return stream.destroy(err)
    var data = stream.read()
    if (!data) {
      want = true
    } else {
      want = false
      fn(data, loop)
    }
  }
}
