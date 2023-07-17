const express = require('express');
const routes  = express.Router();
const AdminController = require('../controller/Admin')
const isLogin = require('../middleware/authentication');

routes.get('/dashboard' ,isLogin,AdminController.DashboardsUser);

routes.get('/add-blog' ,isLogin, AdminController.getAddPost);

routes.post('/add-blog' , isLogin , AdminController.postAddBlog);
// routes.get('/')

module.exports = routes;

