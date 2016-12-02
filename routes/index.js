
var express = require('express');

var router = express.Router();

//link to account model
var Account = require('../models/account');

//reference to passport
var passport = require('passport');

//reference to flash
var flash = require('connect-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StoryPad: Community for Reader',
  message: 'Storypad- where you can save your novels and books',
  user: req.user
  });
});

//GET REGISTER
router.get('/register',function (req, res, next) {
    res.render('register',{
        title: 'Register',
        user: req.user
    });
});
//POST REGISTER
router.post('/register',function (req, res, next) {
// use account model and passpor to create new user
    Account.register(new Account({ username: req.body.username}),
   req.body.password,
    function (err,account) {
        if(err)
        {
            console.log(err);
            res.redirect('/register')
        }
        else
        {
            res.redirect('/login')
        }
    });
});
//GET LOGIN
router.get('/login',function (req, res, next) {
var messages = req.session.messages || [];
   // var messages = flash.message;
    //clear the session
    req.session.messages =[];
    res.render('login',{
        title: 'login',
        messages: messages,
        user: req.user
    });
});

//POST LOGIN
router.post('/login',passport.authenticate('local',{
    successRedirect: '/stories',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
    failureFlash: true
}));
//GET LOGOUT
router.get('/logout',function (req, res, next) {
    //logout the user
    req.logout();
    res.redirect('/login');
});

//get facebook
router.get('/facebook',passport.authenticate('facebook'),
function (req, res, next) {});

/* GET /facebook/callback */
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}), function(req, res, next){
    res.redirect('/stories');
});

module.exports = router;
