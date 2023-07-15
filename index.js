const express   =   require('express');
require('dotenv').config();
const helmet    =   require('helmet')
const cors      =   require('cors');
const session   =   require('express-session')
const cookiesParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const PORT      =   process.env.PORT || 5000;

const dbConnection = require('./config/db-connect');
const App       =   express();
const BlogRoutes=   require('./routes/BlogRoutes');
const AuthRoutes=   require('./routes/auth');
const AdminRoutes = require('./routes/AdminRoutes');


// Initialize the Body parse for json data
App.use(express.json());
// Initialize the form-data from data
App.use(express.urlencoded({extended:false}));
// setup the view engine
App.set('view engine' , "ejs");
App.set('views' , 'views');
// setup the static file to save access css or js file extension
App.use(express.static('public'));
// Initialize the session-cookies
App.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
}))
// set cookies parser
App.use(cookiesParser());
// Establish the database connections
dbConnection();
// Admin routes
App.use(AdminRoutes);
// blogs routes
App.use(BlogRoutes);
// auth routes
App.use('/Blog' , AuthRoutes);

App.listen(PORT , ()=> {
    console.log(`Server on Listing on the PORT${PORT}`)
})







