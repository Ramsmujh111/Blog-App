const express = require('express');
const routes  = express.Router();
const AdminController = require('../controller/Admin')

routes.get('/blog/Admin/post' , AdminController.getAddPost);

module.exports = routes;

