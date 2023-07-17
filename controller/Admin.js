

exports.DashboardsUser = async (req, res) =>{
    res.status(200).render("Dashboard.ejs" , {pageTitle:`Admin Dashboards Pannel`});
}

exports.getAddPost = async (req, res) =>{
    res.render('Add-blogs.ejs' , { pageTitle:'Add Blogs' })
}

exports.postAddBlog = async (req , res) =>{
    console.log(req.file);
    console.log(req.body);
    res.send('nhi batayege')
}