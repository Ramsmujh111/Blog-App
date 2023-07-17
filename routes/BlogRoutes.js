const express = require('express');
const routes  = express.Router();
const BlogController = require('../controller/BlogController');

routes.get('/' , BlogController.GetHomePage);
routes.get('/blogs/:id' , BlogController.getFullPage);

module.exports = routes;