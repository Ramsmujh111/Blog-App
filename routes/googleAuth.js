const express = require('express');
const routes  = express.Router();
const passport = require('passport');

routes.get('/google/auth' , passport.authenticate("google", {
    scope:['email' , "profile"]
})); 
routes.get('/google/callback' , passport.authenticate("google", {
    successRedirect:'/blog/admin/dashboard',
    failureRedirect:'/google/auth/failure'
}));
routes.get('/google/auth/failure' , (req, res) =>{
    res.redirect('/blog/admin/login');
})

routes.get('/blog/admin/logout' , (req,res) => {
    req.session.destroy();
    res.clearCookie('token');
    res.redirect('/')
})
module.exports = routes;