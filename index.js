var server = require('./server')
server.start()
  .then(() => console.log('init'))
  .catch(console.error)



