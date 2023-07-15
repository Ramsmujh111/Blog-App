const jwt = require('jsonwebtoken');
const isLogin = async (req, res , next) => {
    try {
        let accessToken = req.cookie.token;
        if(!accessToken){
           return res.render('login.ejs' , {pageTitle:"Login Please"})
        }

    } catch (error) {
        
    }
}