var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
var Q = require('q');

function getIdeaModel() {
    return Idea;
}


function getUserModel() {
    return User;
}

function getObjectId(fieldName) {
    return new ObjectId(fieldName);
}

function getQ() {
	return Q;
}


module.exports = {
    getIdeaModel: getIdeaModel,
    getObjectId: getObjectId,
    getQ: getQ,
    getUserModel: getUserModel
};
