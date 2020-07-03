const logger = require('../logger');
const express = require('express')
const app = require('../app');
const { bookmarks } = require('../store')
const bookmarksRouter = express.Router()
const bodyParser = express.json()
const { v4: uuid } = require('uuid')

bookmarksRouter
.route('/bookmarks')
.get((req, res) => {
   res
      .status(200)
      .json(bookmarks)
})
.post(bodyParser, (req, res) => {
   const { title, url, desc, rating } = req.body;
   const id = uuid();
   if (!title || !url ) {
      return res
         .status(400)
         .send('must include a title and url')
   }
   if (!url.match(/^((https|http):\/\/)?(www.)?[a-zA-Z0-9]+(.[a-zA-Z]{2,5})/)) {
      return res
         .status(400)
         .send('invalid url')
   }

   const bookmark = {
      id,
      title,
      url,
      desc,
      rating
   }
   bookmarks.push(bookmark);
   logger.info(`posted a bookmark with id ${id}`)
   res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json({id});
})

bookmarksRouter
   .route('/bookmarks/:id')
   .get((req,res) => {
      const {id} = req.params
      const bookmark = bookmarks.find(b => b.id == id)
      if (!bookmark) {
         logger.error(`bookmark with id ${id} not found`)
         return res
            .status(404)
            .send('bookmark not found')
      }
      res
         .status(200)
         .json(bookmark)
   })
   .delete((req, res) => {
      const {id} = req.params
      const index = bookmarks.findIndex(bookmark => bookmark.id == id) 
      bookmarks.splice(index, 1)
      res
         .status(200)
         .send(`bookmark with id ${id} was removed from bookmarks`)
   })
  
module.exports = bookmarksRouter;