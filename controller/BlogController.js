const Blogs = require('../models/Blogs');

/**
 * @description get the all blogs
 * @param {*} req 
 * @param {*} res 
 * @returns return the all blogs as response
 */
exports.GetHomePage =async (req, res) =>{
    try {
        let blogs = await Blogs.find();
        if(!blogs){
          return res.status(400).render("Home.ejs" , {pageTitle:`Blogs website` , message:'blog fetching fails' , status:false});
        }
        res.status(200).render("Home.ejs" , {pageTitle:`Blogs website`, blogs,});
     } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(200).render("Home.ejs" , {pageTitle:`Blogs website` , message:`Internal server Error` , status:false});   
     }
}

/**
 * @description get full blogs description show the content
 * @param {*} req 
 * @param {*} res 
 * @param {string} id send it from the params id to get the blogs description
 */
exports.getFullPage = async(req,res) =>{
    try {
        let blogs = await Blogs.findById(req.params.id);
        res.cookie('blogsId' , req.params.id , { httpOnly:true});
        res.render('blogs.ejs' , {pageTitle:`Full reads blogs` , blogs});
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.render('Home.ejs' , {pageTitle:`Error`});
        
    }
}

/**
 * @description Add the in the blogs
 * @param {*} req 
 * @param {*} res 
 * @param {string} get the params id from the headers params
 * 
 */
exports.AddComment = async (req , res) =>{
    try {
        let paramsId = req.params.id;
        let comment  = req.body.comment;
        let blogs = await Blogs.findById(paramsId);
        blogs.comment.push(comment);
        blogs.save()
        res.redirect(`/blogs/${paramsId}`)
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.render('blogs.ejs' , {pageTitle:'Error To add comment' , message:{err:error.message , stack:error.stack}});
    }
}

/**
 * @description like the blogs
 * @method post
 * @routes /blogs/likes/id
 * @param {*} req 
 * @param {*} res 
 */
exports.PostLikes = async (req, res) =>{
    try {
        let paramsId = req.params.id;
        let blogs = await Blogs.findById(paramsId);
        blogs.like = blogs.like + 1;
        blogs.save();
        res.redirect(`/blogs/${paramsId}`)
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).render('blogs.ejs' , {pageTitle:'Internal server error' , message:{err:error.message , stack:error.stack}});
        
    }
}

/**
 * @description dislike the blogs
 * @method post
 * @routes /blogs/likes/id
 * @param {*} req 
 * @param {*} res 
 */
exports.PostDisLikes = async (req, res) =>{
    try {
        let paramsId = req.params.id;
        let blogs = await Blogs.findById(paramsId);
        blogs.like = blogs.like - 1;
        blogs.save();
        res.redirect(`/blogs/${paramsId}`)
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).render('blogs.ejs' , {pageTitle:'Internal server error' , message:{err:error.message , stack:error.stack}});
        
    }
}

