const passport = require('passport')
const express = require('express')

const route = express.Router()

route.get('/', function(req, res){
    res.render('pages/index.ejs')
})

route.get('/profile', isLoggedIn, (req, res)=>{
    res.render('pages/profile.ejs',{
        user:req.user
    })
})

route.get('/error', isLoggedIn, (req, res)=>{
    res.render('pages/erros.ejs')
})

route.get('/auth/facebook', passport.authenticate('facebook',{
    scope : ['public_profile', 'email']
}))


route.get('/auth/fecebook/callback',(req, res)=>{
    passport.authenticate('facebook',{
        successRedirect:'/profile',
        failureRedirect:'/error'
    })
})

route.get('/logout', (req, res)=>{
    res.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next()
    res.redirect('/')
}


module.exports = route