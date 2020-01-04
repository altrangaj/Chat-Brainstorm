const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')


const UserController = {
  getAll: async (request, response) => {
    const data = await User.find({})
    const users = data.map(ch => ch.toJSON())
    response.json({users: users}) 
  },
  registerUser:  async (request, response, next) => {
    try {
      const body = request.body
      if (body.username === undefined || body.password === undefined
				|| body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'missing or invalid password or username' })
      }
      const saltRounds = 10
      const password = await bcrypt.hash(body.password, saltRounds)
      
      const user = new User({
        username: body.username,
        password
      })
      
      const savedUser = await user.save()
      
      response.json(savedUser.toJSON())
    } catch (exception) {
      if (exception.name === 'ValidationError') {
        return response.status(400).json({ error: 'dublicate username' })
      }
      next(exception)
    }
  },
  authenticateUser: async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
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
  }
}

module.exports = UserController