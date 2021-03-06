require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const logger = require ('./logger')
const bookmarksRouter = require('./bookmarks/bookmarks')
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(function validateBearerToken(req, res, next) {
   const apiToken = process.env.API_TOKEN
   const authToken = req.get('Authorization')
   if (!authToken || authToken.split(' ')[1] !== apiToken) {
      logger.error(`Unauthorized request to path: ${req.path}`);
      return res.status(401).json({ error: 'unauthorized request' })
   }
   next()
 })
app.use(helmet())
app.get('/', (req, res) => {
   res.send('Welcome to bookmarks App/API!')
})
app.use(bookmarksRouter)
app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
      respone = { error: { message: 'server error'}}
   } else {
      console.error(error)
      response = {message: error.message, error }
   }
   res.status(500).json(response)
})
app.use(cors())

module.exports = app