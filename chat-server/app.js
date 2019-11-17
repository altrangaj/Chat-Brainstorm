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
/*
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://juha.jokeri@gmail.com:Qeadzc13"@cluster0-oxzpv.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
 // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
})
*/
app.use(cors())
app.use(bodyParser.json())
/*
app.use('/',function (req, res) {
    res.cookie('foo', 'bar', {
      sameSite: true
    })
    res.end()
  })
*/
app.use('/api/users',userRouter)
app.use('/api/channels',channelRouter)

module.exports = app