const jwt = require('jsonwebtoken');
const SignupWithPassword = async (req , res) => {
    try {
        let accessToken = req.cookies.token;
        if(!accessToken){
           return res.render('login.ejs' , {pageTitle:"Login Please" , message:'unauthorized' , status:false})
        }
        // verified the accessToken
        let decode = jwt.verify(accessToken , process.env.JWT_TOKEN);
        req.userId = decode._id;
        return true;
    } catch (error) {
        console.log(error.message);
        res.status(500).render('login.js' , {pageTitle:'Login page' , message:error.message});
    }
}

const GoogleIsLogin = (req, res) =>{
    if(req.user){
        return true;
    }
    res.redirect('/blog/admin/login');
}

const isLogin = (req, res, next) =>{
    if(GoogleIsLogin(req,res) || SignupWithPassword(req,res)){
       return next();
    }else {
        res.redirect('/blog/admin/login')
    }
}


module.exports = isLogin;