var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var debug = require('debug')('server')

var Analytics = require('analytics-node')
var analytics = new Analytics('i6aoC3CdUjS4BvSOvmJQguLBAlvzt6kG')

var app = express()
var PORT = process.argv.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/identify', function (req, res, next) {

  // already sanitized
  var body = req.body

  analytics.identify(body, function (err, response, data) {
    debug('Identify', err, response)
  })
  res.send({
    event: 'identify',
    message: 'success'
  })
})

app.post('/track', function (req, res, next) {

  // already sanitized
  var body = req.body
  console.log('THE BODY IS', req.body)

  analytics.track(body, function (err, response, data) {
    debug('Track', err, response)
  })
  res.send({
    event: 'track',
    message: 'success'
  })
})

app.post('/alias', function (req, res, next) {
  // already sanitized
  var body = req.body

  analytics.alias(body, function (err, response, data) {
    debug('Alias', err, response)
  })
  res.send({
    event: 'alias',
    message: 'success'
  })

})

app.post('/screen', function (req, res, next) {
  // already sanitized
  var body = req.body

  // THIS WILL ERROR, DOES NOT EXIST
  // Use as demo for errors
  return res.sendStatus(501)

  analytics.screen(body, function (err, response, data) {
    debug('Screen', err, response)
  })
  res.send({
    event: 'screen',
    message: 'success'
  })
})

app.post('/page', function (req, res, next) {
  // already sanitized
  var body = req.body

  analytics.page(body, function (err, response, data) {
    debug('Page', err, response)
  })
  res.send({
    event: 'screen',
    message: 'success'
  })

})

app.post('/group', function (req, res, next) {
  // already sanitized
  var body = req.body

  analytics.group(body, function (err, response, data) {
    debug('Group', err, response)
  })
  res.send({
    event: 'group',
    message: 'success'
  })
})


//app.use(function handleError(err, req, res, next) {
//  console.log('ERROR', err)
//  if (err) {
//    return res.send(err.message || err)
//  }
//  debug('handleError::', 'Should not log here')
//  //return res.send(err)
//})

app.start = function start(pre, logger) {
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
