const { ValidateSchema, ValidateLogin } = require('../middleware/validations');
const User =  require('../models/Users');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken')
/**
 * @request get 
 * @param {Object} req 
 * @param {Object} res 
 * @routes /Blog/signup
 * @render render on signup page 
 */
exports.signup = async (req, res) => {
     res.render('signup.ejs' , {pageTitle:"signup"})
}

exports.signupPost = async (req , res) => {
    try {
        let user = await ValidateSchema.validateAsync(req.body);
        // find user in db 
        let getExist = await User.findOne({Email:user.Email});
        // check if user exist
        if(getExist){
           return res.status(409).render('Error-page.ejs' , {pageTitle:'Error' , message:'please try again duplicate user' , status:false});
        }
        const salt     =await bcrypt.genSaltSync(10);
        const hashPass =await bcrypt.hashSync(user.password, salt);
        // create the new instance of user
        let CreateUser = new User({
            UserName:user.UserName,
            Email:user.Email,
            password:hashPass

        })
        CreateUser.save()
        .then((result) =>{
            return res.status(201).render('Error-page.ejs' , {
                pageTitle:'User has been created',
                message:`User created Please Login as Admin`,
                status:true
            })
        })

    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).render('Error-page.ejs' , {pageTitle:`Server Error` , message:`${error.message} </br> ${error.stack}` , status:false})
    }
}

exports.getLogin = async (req, res) => {
    res.render("login.ejs" , {pageTitle:"Login Admin" , status:true})
}

exports.postLogin = async (req, res)=> {
    try {
        let Validator = await ValidateLogin.validateAsync(req.body);
        const users = await User.findOne({Email:Validator.Email});
        // if not user so return 404 user is not found
        if(!users){
            return res.status(404).render('login.ejs' , { pageTitle:"login" , message:"User does't exist" , status:false})
        }
        // compare the password
        const passwordCompare = await bcrypt.compareSync(Validator.password,users.password);
        if(!passwordCompare){
            return res.status(400).render('login.ejs' , {pageTitle:'login' , message:"unauthorized" , status:false})
        }
        const token = jwt.sign(
            {
                _id:users._id
            },
            process.env.JWT_TOKEN,
            {
                expiresIn : '1d'
            }
        )
        // set the cookie for the user
        res.cookie('token' , token , { httpOnly:true});
        res.status(200).redirect('/blog/admin/dashboard');
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
        res.status(500).render('login.ejs' , {pageTitle:'Internal server Error' , message:`${error.message} and ${error.message}` , status:false})
    }
}