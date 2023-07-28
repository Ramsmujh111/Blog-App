const express = require('express');
const routes  = express.Router();
const BlogController = require('../controller/BlogController');

routes.get('/' , BlogController.GetHomePage);
// routes.get('/blogs/:id' , BlogController.getFullPage);
// routes.post('/blogs/comment/:id' , BlogController.AddComment);
// routes.post('/blogs/like/:id' , BlogController.PostLikes);
// routes.post('/blogs/dislike/:id' , BlogController.PostDisLikes)

module.exports = routes;