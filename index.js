const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy


const routes = require('./routes/userRoute')

const config = require('./config/config')

app.set('view engine', 'ejs')
app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : 'SECRET'
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, Object)
})

passport.use(new facebookStrategy(
    {
        clientID:config.facebookAuth.clientID,
        clientSecret:config.facebookAuth.clientSecret,
        callbackURL:config.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done){
        //if profile.id 
        //else insert
        return done(null, profile) 
    }
))

app.use('/',routes)

const port = 3000;
app.listen(port, ()=>console.log("Server is start "+ port))