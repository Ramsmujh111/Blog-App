const cloudinary = require('cloudinary');
const Blogs = require('../models/Blogs');
const { validateBlog } = require('../middleware/validations');
require('../config/clodenary');
exports.DashboardsUser = async (req, res) =>{
    res.status(200).render("Dashboard.ejs" , {pageTitle:`Admin Dashboards Pannel`});
}

exports.getAddPost = async (req, res) =>{
    res.render('Add-blogs.ejs' , { pageTitle:'Add Blogs' })
}

exports.postAddBlog = async (req , res) =>{
   try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const { title , description } = req.body;
    const validBlog = await validateBlog.validateAsync({title , description , fileUpload:result.url});
    console.log(result)
    res.json(result);
   } catch (error) {
     console.log(error.message)
     console.log(error.stack)
   }
}