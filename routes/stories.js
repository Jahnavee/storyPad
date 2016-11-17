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
        // if error occurs then link it to error.ejs
       if(err)
       {
           console.log(err);
           res.render('error');
       }
       else
       {
           //else load the story page and pass the query
           res.render('stories',
               {
                   title: 'StoryPad: Community for reader and writter',
                   stories: stories
               });
       }
    });

});

// GET /stories/ add to show form
router.get('/add',function (req,res, next) {
    res.render('add-story',{title: 'Add Your Story '});
});

//POST/stories/add - form subbmisson
router.post('/add',function (req,res,next) {
    Story.create ({
        name: req.body.name,
        storyType: req.body.storyType,
        storyWrite: req.body.storyWrite
    },function (err, Story) {
        if(err)
        {
            console.log(err);
            res.render('error',{message:'sorry, could not add story'});
        }
        else
        {
            res.redirect('/stories');
        }
    });
});
//maing it public
module.exports = router;