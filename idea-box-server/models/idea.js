
var mongoose = require('mongoose'), Schema = mongoose.Schema;



var idea = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdOn: {type: Date, required: true},
    category: {type: String, required: true},
    ideaList: {type: [idea]},
    //ideaList: [{type: Schema.ObjectId, ref: 'Idea'}]
});

module.exports = {
    Idea: idea
};