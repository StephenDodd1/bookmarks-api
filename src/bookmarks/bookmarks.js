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
bookmarksRouter
   .route('/bookmarks/:id')
   .get((req,res)=> {
      const {id} = req.params
      const bookmark = bookmarks.find(b => b.id === id)
      if (!bookmark) {
         logger.error(`bookmark with id ${id} not found`)
         return res
            .status(404)
            .send('bookmark not found')
      }
      res.json(bookmark)

      res
         .json(bookmark)
   })
module.exports = bookmarksRouter;