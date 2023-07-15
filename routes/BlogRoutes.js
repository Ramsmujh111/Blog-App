const express = require('express');
const routes  = express.Router();
const BlogController = require('../controller/BlogController');

routes.get('/' , BlogController.GetHomePage);

module.exports = routes;