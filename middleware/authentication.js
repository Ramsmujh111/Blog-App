const jwt = require('jsonwebtoken');
const Linkedine = require('../models/LinkdinUser');
const isLogin = async (req , res , next) => {
    try {
        let accessToken = req.cookies.token;
        console.log(accessToken);
        if(!accessToken && !req.user){
            res.render('login.ejs' , {pageTitle:"Login Please" , message:'unauthorized' , status:false})
        }else if(accessToken){
            let decode = jwt.verify(accessToken , process.env.JWT_TOKEN);
            // console.log(JSON.stringify(decode)+'============comming from middleware');
            req.user = decode
            // console.log(req.user+'comming from middleware');
            return next();
        }else{
            return next();
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).render('login.js' , {pageTitle:'Login page' , message:error.message});
    }
}

const LinkedineAuthetication = async (req, res , next) =>{
     try {
        let accessToken  = req.cookies.Token;
        if(!accessToken){
            return res.redirect('/getAccessToke');
        }
        let existToken = await Linkedine.findOne({accessToken:accessToken});
        if(!existToken){
            return res.redirect('/getAccessToke');
        }
        next();
     } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.redirect('/getAccessToke')
     }
}

module.exports = {
    isLogin,
    LinkedineAuthetication,
};