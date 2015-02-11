var dependency = require('../dependency');
var treeStructure = require('./generateTreeStructure');
var _ = require('lodash');

var successResult = {
    "status": "SUCCESS",
    "data": {
        ideaList: {}
    },
    "error": null
};



function getIdeaList(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var filter = {};
    var category = req.query.category;
    if (category) {
        filter = {
            category: category
        };
    }
    Idea.find(filter).sort('-createdOn').lean().exec(function(err, ideas) {
        if (err) {
            res.send(500);
            return;
        }
        var tree = treeStructure.unflatten(treeStructure.addParentIdIfMissing(ideas));
        successResult.data.ideaList = tree;
        res.status(200).json(successResult);
    });
}

module.exports = {
    list: getIdeaList
}
