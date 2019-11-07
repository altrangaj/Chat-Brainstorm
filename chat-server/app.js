const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const channelRouter = require('./controllers/channels')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true })

/*
app.use('/',function (req, res) {
    res.cookie('foo', 'bar', {
      sameSite: true
    })
    res.end()
  })
*/
app.use('/api/channels',channelRouter)


module.exports = app