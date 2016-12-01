/**
 * Created by Sony on 11/29/2016.
 */
//link to mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
});

accountSchema.plugin(plm);

//make it public
module.exports =  mongoose.model('Account',accountSchema);
