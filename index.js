const express   =   require('express');
require('dotenv').config();
const helmet    =   require('helmet')
const cors      =   require('cors');
const Session   =   require('express-session')
const cookiesParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const PORT      =   process.env.PORT || 5000;
const passport  = require('passport');
const passportSetUp = require('./config/passport-setup');
const dbConnection = require('./config/db-connect');
const App       =   express();
const BlogRoutes=   require('./routes/BlogRoutes');
const AuthRoutes=   require('./routes/auth');
const AdminRoutes = require('./routes/AdminRoutes');
const GoogleAuthRoutes = require('./routes/googleAuth');
// Initialize the Body parse for json data
App.use(express.json());
// Initialize the form-data from data
App.use(express.urlencoded({extended:false}));
// setup the view engine
App.set('view engine' , "ejs");
App.set('views' , 'views');
// setup the static file to save access css or js file extension
App.use(express.static('public'));
// db connection
dbConnection();
// Initialize the session-cookies
App.use(Session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave:false,
    cookie:{ secure: false},
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
}))
// set cookies parser
App.use(cookiesParser());
// Initialize the passport middleware
App.use(passport.initialize())
App.use(passport.session());
// Establish the database connections
// Admin routes
App.use('/blog/admin' , AdminRoutes);
// blogs routes
App.use(BlogRoutes);
// auth routes
App.use('/Blog' , AuthRoutes);
// implement google auth
App.use(GoogleAuthRoutes);


App.listen(PORT , ()=> {
    console.log(`Server on Listing on the PORT${PORT}`)
})







