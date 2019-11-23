const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const channelRouter = require('./routes/channelRouter')
const userRouter = require('./routes/userRouter')
const config = require('./utils/config')
const cors = require('cors')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users',userRouter)
app.use('/api/channels',channelRouter)

module.exports = app