/**
 * Created by Sony on 11/15/2016.
 */
//Defining Schema for story model
var storySchema = new mongoose.Schema
({
    name: {
        type:String,
        required: 'Please enter name for your story'
    },

    storyType: {
        type: String,
        required: 'Please choose type'
    },

    storyWrite: {
        type: String,
        required: 'Please write your story in text box'
    }

});

module.exports = mongoose.model('Story',storySchema);