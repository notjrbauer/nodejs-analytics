var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var debug = require('debug')('server')

var Analytics = require('analytics-node')
var analytics = new Analytics('i6aoC3CdUjS4BvSOvmJQguLBAlvzt6kG')

var app = express()
var PORT = process.argv.PORT || 4001

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.post('/identify', function (req, res, next) {

  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp)

  try {
    analytics.identify(body, function (err, response, data) {
      debug('Identify', err, response)
      debug('Data', data)

      res.send({
        event: 'identify',
        message: 'success'
      })
    })
  } catch (err) {
    return res.send(err)
  }
})

app.post('/track', function (req, res, next) {

  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp || new Date())

  try {
    analytics.track(body, function (err, response, data) {
      res.send({
        event: 'track',
        message: 'success'
      })
      debug('Track', err, response)
    })
  } catch (err) {
    return res.send(err)
  }
})

app.post('/alias', function (req, res, next) {
  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp)

  try {
    analytics.alias(body, function (err, response, data) {
      res.send({
        event: 'alias',
        message: 'success'
      })
      debug('Alias', err, response)
    })
  } catch (err) {
    return res.send(err)
  }
})

app.post('/screen', function (req, res, next) {
  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp)

  // THIS WILL ERROR, DOES NOT EXIST
  // Use as demo for errors
  return res.send({event: 'screen', message: 'deprecated'})

  analytics.screen(body, function (err, response, data) {
    res.send({
      event: 'screen',
      message: 'success'
    })
    debug('Screen', err, response)
  })
})

app.post('/page', function (req, res, next) {
  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp)

  try {
    analytics.page(body, function (err, response, data) {
      res.send({
        event: 'screen',
        message: 'success'
      })
      debug('Page', err, response)
    })
  } catch (err) {
    return res.send(err)
  }
})

app.post('/group', function (req, res, next) {
  // already sanitized
  var body = req.body
  body.timestamp = new Date(body.timestamp)

  try {
    analytics.group(body, function (err, response, data) {
      res.send({
        event: 'group',
        message: 'success'
      })
      debug('Group', err, response)
    })
  } catch (err) {
    return res.send(err)
  }
})

app.use(function handleError (err, req, res) {
  console.log('ERROR', err)
  if (err) {
    return res.send(err.message || err)
  }
  debug('handleError::', 'Should not log here')
// return res.send(err)
})

app.start = function start (pre, logger) {
  return new Promise(function (resolve, reject) {
    try {
      app.listen(PORT, function () {
        debug('Start::Now listening on port: ', PORT)
        return resolve(app)
      })
    } catch (e) {
      debug('Start::', e)
      return reject(e)
    }
  })
}

module.exports = app
