# stream-each

Iterate all the data in a stream

```
npm install stream-each
```

## Usage

``` js
var each = require('stream-each')

each(stream, function (data, next) {
  console.log('data from stream', data)
  // when ready to consume next chunk
  next()
})
```

## API

#### `each(stream, iterator)`

Iterate the data in the stream by calling the iterator function with `(data, next)`
where data is a data chunk and next is a callback. Call next when you are ready to
consume the next chunk. Optionally you can call next with an error to destroy the stream

## License

MIT
