const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/Users');

passport.serializeUser((user , done) =>{
    done(null , user);
})
// deserializeUser
// which when the cookies comes back to us in the server when a browser makes a request for the profile page
// where we're going received the id and going to deserialize it so that we can grab a user from that id 
passport.deserializeUser(async(id , done) =>{
    const existUsers = await User.findById(id);
    if(!existUsers){
       console.log(`Id does not exist | deserializeUser`)
       return ;
    }
    done(null , existUsers)
})

passport.use( new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_REDIRECT_URI,
    passReqToCallback:true
} , async (request, accessToken, refreshToken, profile, done) =>{
    // passport callback url
    console.log("profile" + JSON.stringify(profile.picture));


    // check if user exist from the db 
    try {
        const existUser = await User.findOne({Email:profile.emails[0].value});
        if(existUser){
            console.log(`user save is databases`);
            existUser.accessToken = accessToken;
            existUser.save();
            return done(null , existUser);
        }
        let newUser = new User({
            UserName:profile.displayName,
            Email:profile.emails[0].value,
            imageUrl:profile.picture,
            accessToken,
            googleId:profile.id
        })
        await newUser.save()
        done(null , newUser)
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
    }
}
))

// module.exports = passport;
