const cloudinary = require('cloudinary');
const Blogs = require('../models/Blogs');
const { validateBlog } = require('../middleware/validations');
require('../config/clodenary');
exports.DashboardsUser = async (req, res) =>{
   try {
    //   console.log(req.user);
      let blogs = await Blogs.find({user:req.user._id});
      if(!blogs){
        return res.status(400).render("Dashboard.ejs" , {pageTitle:`Admin Dashboards Pannel` , message:'blog fetching fails' , status:false});
      }
    //   console.log(blogs);
      res.status(200).render("Dashboard.ejs" , {pageTitle:`Admin Dashboards Pannel` , blogs,});
   } catch (error) {
      console.log(error.message);
      console.log(error.stack);
      res.status(200).render("Dashboard.ejs" , {pageTitle:`Admin Dashboards Pannel` , message:`Internal server Error` , status:false});   
   }
}

exports.getAddPost = async (req, res) =>{
    res.render('Add-blogs.ejs' , { pageTitle:'Add Blogs' , userId:req.user._id});
}

exports.postAddBlog = async (req , res) =>{
   try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const { title , description , userId} = req.body;
    console.log(userId);
    const validBlog = await validateBlog.validateAsync({title , description , fileUpload:result.url});
    const saveBlog = new Blogs({
        title:validBlog.title,
        description:validBlog.description,
        FileDestination:validBlog.fileUpload,
        user:userId,
    })
    await saveBlog.save();
    console.log(`Blog has been add`);
    res.redirect('/blog/admin/dashboard');
   } catch (error) {
     console.log(error.message)
     console.log(error.stack)
     res.render('Add-blogs.ejs' , {pageTitle:`Error` , message:`internal server error` , status:false});
   }
}

exports.editPage = async (req, res) =>{
    try {
        let blogs = await Blogs.findById(req.params.id);
        res.render('edit-page.ejs' , {pageTitle:`update blogs` , blogs})
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).render('/blog/admin/dashboard' , {pageTitle:`Getting error`});
    }
}

exports.editPost  = async (req, res) =>{
    try {
        const paramId = req.params.id;
        const updatedBlogs = await Blogs.findByIdAndUpdate(
           paramId,
           {
            $set:req.body,
           },
           {
            new: true,
           }       
        );
        // custom message
        var obj = {
            status:false,
            message:`data was not updated`
        }
        console.log(updatedBlogs)
        if(!updatedBlogs){
            return res.status(204).render('edit-page.ejs' , {pageTitle:`edit page` ,obj})
        }
        res.redirect('/blog/admin/dashboard');
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).render(`edit-page.ejs` , {pageTitle:'edit page' , obj});        
    }
}

exports.delete = (req, res) =>{
    let parmId = req.params.id;
    Blogs.findByIdAndDelete(parmId)
    .then((result)=>{
        console.log(result)
        res.redirect('/blog/admin/dashboard');
    })
    .catch((err) =>{
        console.log(err.message)
        res.status(500).render('/blog/admin/dashboard' , {pageTitle:`Error `})
    })
}