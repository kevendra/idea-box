
var mongoose = require('mongoose'), Schema = mongoose.Schema;



var idea = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    createdOn: {type: Date, required: true},
    category: {type: String, required: true},
    ideaList: [],
    parentId: {type: String}
});

module.exports = {
    Idea: idea
};