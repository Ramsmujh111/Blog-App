const express = require('express');
const routes  = express.Router();
const passport = require('passport');
const {LinkedineAuthetication} = require('../middleware/authentication');
const Blogs = require('../models/Blogs');
const axios = require('axios');
const Linkedine = require('../models/LinkdinUser');

routes.get('/auth/linkedin', passport.authenticate('linkedin'));
routes.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', { session: false }),
    (req, res) => {
      // Redirect or send a response with the access token
      let id = req.cookies.blogsId;
      console.log(req.user);
      res.cookie('Token' , req.user.accessToken , { httpOnly:true});
      res.redirect(`/blogs/${id}`);
    }
);
// middleware for authentication with login user
routes.get('/getAccessToke' , (req, res) =>{
    res.render('linkdin.ejs',{ pageTitle:'Login with Linkedin To Get access Token'})
})

routes.post('/share-linkedin/:id' , LinkedineAuthetication , async (req, res) =>{
    try {
        let id = req.params.id
        console.log(id);
        let data = await Blogs.findById(id);
        if(!data){
            return res.redirect(`blogs/${id}`);
        }
        let accessToken  = req.cookies.Token;
        let user = await Linkedine.findOne({accessToken:accessToken});
        if(!user){
            console.log(`we can find the user `);
            return res.redirect(`/blogs/${id}`)
        }
        const response = await axios.post(
            'https://api.linkedin.com/v2/ugcPosts',
            {
              author: `urn:li:person:${user.id}`,
              lifecycleState: 'PUBLISHED',
              specificContent: {
                'com.linkedin.ugc.ShareContent': {
                  shareCommentary: {
                    text: data.title,
                  },
                  shareMediaCategory: 'ARTICLE',
                  media: [
                    {
                      status: 'READY',
                      originalUrl: data.FileDestination
                    }
                  ]
                }
              },
              visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS'
              }
            },
            {
              headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0'
              }
            }
          );
      
          console.log('Post shared successfully:', response.data);
          res.status(200).send('Post shared successfully!');
      
    } catch (error) {
        console.error('Error sharing post:', error.response.data);
        res.redirect(`/blogs/${id}`)
        
    }
})

module.exports = routes;



