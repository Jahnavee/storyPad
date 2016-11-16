/**
 * Created by Sony on 11/15/2016.
 */
var express = require('express');
var router = express.Router();

//linking to story model
var Story = require('../models/story');
//GET story page
router.get('/',function (req,res,next) {
    // use story model query database 
    Story.find(function (err,stories) {
        // if error occurs the link it to error.ejs
       if(err)
       {
           console.log(err)
       }
       else
       {
           //else load the story page and pass the query
           res.render('stories',
               {
                   title: 'StoryPad: Community for reader and writter'
               });
       }
    });

});

//maing it public
module.exports = router;