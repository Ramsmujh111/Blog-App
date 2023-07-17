const express = require('express');
const routes  = express.Router();
const authController = require('../controller/auth');
// we can disable the signing functions
routes.get('/signup' , authController.signup)
routes.post('/signup', authController.signupPost)
routes.get('/admin/login' , authController.getLogin);
routes.post('/admin/login' , authController.postLogin);

module.exports = routes;