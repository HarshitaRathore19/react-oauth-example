const express = require('express')
const passport = require('passport')
const key = require('./keys')
var GoogleStrategy = require('passport-google-oauth20').Strategy;


const mongoose = require('mongoose')
const User = require('./models/userModel')
const url = "mongodb://localhost:27017/googleOAuthDb"
mongoose.connect(url,()=>{
  console.log('Mangoose connected successfully')
})



const app = express()

app.listen(5000,()=>{
	console.log("Server started on port number 5000")
})




const cookiesession = require('cookie-session')
const cookiekey = 'harshita'
app.use(
  cookiesession({
    maxAge:30*24*60*60*1000,
    keys:[cookiekey]
  })
  )


app.use(passport.initialize())
app.use(passport.session())


app.get('/',(request,response)=>{
  response.send("Hello")
})


passport.serializeUser((user,done)=>{
  done(null,user.id)
})


passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user)
  })
})


app.get('/api/getuser',(request,response)=>{
  response.send(request.user)
})


app.get('/api/logout',(request,response)=>{
  request.logout()
  response.send(request.user)
})





passport.use(new GoogleStrategy({
    clientID: key.googleClientId,
    clientSecret: key.googleSecretId,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       console.log(profile.id)
       console.log(profile.displayName)
       console.log(profile._json.picture)

      User.findOne({profileId:profile.id}).then((existinguser)=>{
        if(existinguser)
          done(null,existinguser)
        else{
          new User({profileId:profile.id,profileName:profile.displayName,profilePicture:profile._json.picture}).save().then((user)=>{
            done(null,user)
          })
        }
      })
       })
  
);






  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));



  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });



  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
