const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const UserController = {
    registerUser:  async (request, response, next) => {
        try {
          const body = request.body
          if (body.username === undefined || body.password === undefined) {
            return response.status(400).json({ error: 'missing password or username' })
          }
          const saltRounds = 10
          const password = await bcrypt.hash(body.password, saltRounds)
      
          const user = new User({
            username: body.username,
            password
          })
      
          const savedUser = await user.save()
      
          response.json(savedUser)
        } catch (exception) {
          if (exception.name === 'ValidationError') {
            return response.status(400).json({ error: 'dublicate username or too short' })
          }
          next(exception)
        }
      },
    authenticateUser: async (request, response, next) => {
        try{
            const body = request.body
            console.log('auth:',body)
            const user = await User.findOne({ username: body.username })
            console.log('user:',user)
            const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.password)
        
            if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
            }
        
            const userForToken = {
            username: user.username,
            id: user._id
            }
        
            const token = jwt.sign(userForToken, process.env.SECRET)
        
            response
            .status(200)
            .send({ token, username: user.username, userId: user._id })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
      }
}

module.exports = UserController;