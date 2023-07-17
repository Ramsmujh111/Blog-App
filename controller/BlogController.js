const Blogs = require('../models/Blogs');
exports.GetHomePage =async (req, res) =>{
    try {
        let blogs = await Blogs.find();
        if(!blogs){
          return res.status(400).render("Home.ejs" , {pageTitle:`Blogs website` , message:'blog fetching fails' , status:false});
        }
        console.log(blogs);
        res.status(200).render("Home.ejs" , {pageTitle:`Blogs website`, blogs,});
     } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(200).render("Home.ejs" , {pageTitle:`Blogs website` , message:`Internal server Error` , status:false});   
     }
}

exports.getFullPage = async(req,res) =>{
    try {
        let blogs = await Blogs.findById(req.params.id);
        res.render('blogs.ejs' , {pageTitle:`Full reads blogs` , blogs});
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.render('Home.ejs' , {pageTitle:`Error`});
        
    }
}