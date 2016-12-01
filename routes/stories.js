/**
 * Created by Sony on 11/15/2016.
 */

var express = require('express');
var router = express.Router();

//linking to story model
var Story = require('../models/story');
//auth check
function  isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect('/login');
    }
}
//GET story page
router.get('/',isLoggedIn, function (req,res,next) {
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
                   title: 'StoryPad: Community for reader',
                   stories: stories,
                   user: req.user
               });
       }
    });

});

// GET /stories/ add to show form
router.get('/add',isLoggedIn,function (req,res, next) {
    res.render('add-story',{title: 'Add Your Story ',
        user: req.user
    });
});

//POST/stories/add - form subbmisson
router.post('/add',isLoggedIn,function (req,res,next) {
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

//GET/stories/delete/id
router.get('/delete/:_id/',isLoggedIn,function (req,res,next) {
    //get id from url
    var _id = req.params._id;

//    delete with _id
    Story.remove({_id: _id},function (err) {
        if(err)
        {
            console.log(err);
            res.render('error',{
                message:'Could not delete the story',
                error: err
            });
        }
        else
        {
            res.redirect('/stories');
        }
    });

});
//GET stories _id for editing page
router.get('/:_id',isLoggedIn,function (req,res,next) {
    //get id
    var _id =  req.params._id;

    //use mongoose
    Story.findById({ _id: _id},function (err,story) {
       if(err)
       {
           console.log(err);
           res.render('error',{
               message: 'could not load page',
               error: err
           });
       }
       else
       {
           res.render('edit-story',{
               title: 'Edit your Story',
               story: story,
               user: req.user
           });
       }
    });

});
//POST/stories/_id
router.post('/:_id',function (req,res,next) {
   //get id
    var _id = req.params._id;

    //instantiate and populate the new story
    var story = new Story({
        _id: _id,
        name: req.body.name,
        storyType: req.body.storyType,
        storyWrite: req.body.storyWrite
    });

    //update the page
    Story.update({_id: _id}, story, function (err) {
       if(err)
       {
           console.log(err);
           res.render('error',{
               message:'Could not update',
               error: err
           });
       }
       else
       {
           res.redirect('/stories');
       }
    });
});
//maing it public
module.exports = router;