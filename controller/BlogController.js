

exports.GetHomePage = (req, res) =>{
    res.render('Home.ejs' , { pageTitle:'Home page' })
}