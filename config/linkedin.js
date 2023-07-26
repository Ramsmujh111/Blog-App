const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const Linkedine = require('../models/LinkdinUser');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser( async (id, done) => {
    const existUsers = await User.findById(id);
    if(!existUsers){
       console.log(`Id does not exist | deserializeUser`)
       return ;
    }
    done(null , existUsers)
});

passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.Linkedin_client_id,
        clientSecret:process.env.Linkedin_client_secret,
        callbackURL: process.env.Linkedin_client_redirect,
        scope: ['r_liteprofile', 'w_member_social'],
      },
      async (accessToken, refreshToken, profile, done) => {
        // Save the access token for later use
        // You may want to store it in a database or session
        // You can also pass it as a parameter to the share LinkedIn route
        profile.accessToken = accessToken; 
        try {
            const existUser = await Linkedine.findOne({id:profile.id});
            if(existUser){
                console.log(`user save is databases`);
                existUser.accessToken = accessToken;
                existUser.save();
                return done(null , existUser);
            }
            let newUser = new Linkedine({
                UserName:profile.displayName,
                id:profile.id,
                imageUrl:profile.photos[0].value,
                accessToken,
            })
            await newUser.save()
            done(null , newUser)
        } catch (error) {
          console.log(error.message);
          console.log(error.stack);
        }
      }
    )
);