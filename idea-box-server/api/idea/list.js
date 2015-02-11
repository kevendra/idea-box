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

var failedResult = {
    "status": "FAILED",
    "data": {},
    "msg": [{
        "type": "danger",
        "value": [{
            "title": "Error",
            "text": "Error retriving the list of ideas",
            "param": null
        }]
    }],
    error: "failed"
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
            res.status(500).json(failedResult);
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
