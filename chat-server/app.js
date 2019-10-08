const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const channelRouter = require('./controllers/channels')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(bodyParser.json())

app.use('/api/channels',channelRouter)


module.exports = app