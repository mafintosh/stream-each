module.exports = each

function each (stream, fn) {
  var want = false

  stream.on('readable', function () {
    if (want) loop(null)
  })
  loop(null)

  return stream

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