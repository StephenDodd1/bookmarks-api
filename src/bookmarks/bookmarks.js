const logger = require('../logger');
const express = require('express')
const app = require('../app');
const { bookmarks } = require('../store')
const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
.route('/bookmarks')
.get((req, res) => {
   res
      .json(bookmarks)
})

module.exports = bookmarksRouter;