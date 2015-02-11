var dependency = require('../dependency');
var _ = require('lodash');

var successResult = {
    "status": "SUCCESS",
    "data": {},
    "msg": [{
        "type": "success",
        "value": [{
            "title": "Saved successfully",
            "text": "",
            "param": null
        }]
    }],
    "error": null
};


var failedResult = {
    "status": "FAILED",
    "data": {},
    "msg": [{
        "type": "danger",
        "value": [{
            "title": "Error",
            "text": "idea not saved",
            "param": null
        }]
    }],
    error: "failed"
};

function addOrUpdateIdea(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var title = req.body.title;
    var description = req.body.description;
    var category = req.body.category;
    var createdOn = new Date();
    var parentId = req.body.parentId;
    var Q = dependency.getQ();
    var deferred = Q.defer();

    if (req.body._id) {
        dependency.getIdeaModel().findOne({
            _id: new dependency.getObjectId(req.body._id)
        }, function(err, doc) {
            if (!err && doc) {
                doc.title = title;
                doc.description = description;
                doc.category = category;
                doc.createdOn = createdOn;
                doc.parentId = parentId;
                doc.save(function(err, doc) {
                    if (!err) {
                        res.status(200).json(successResult);
                        //deferred.resolve(doc);
                        console.log(JSON.stringify(doc));
                    } else {
                        res.status(200).json(failedResult);
                        console.log('Errorororororor');
                    }

                });

            }
        });
    } else {
        var idea = new dependency.getIdeaModel()();
        idea.title = title;
        idea.description = description;
        idea.category = category;
        idea.createdOn = createdOn;
        idea.parentId = parentId;
        idea.save(function(err, doc) {
            console.log('Error is **** ' + err);
            if (!err) {
                res.status(200).json(successResult);
                console.log(JSON.stringify(doc));
            } else {
                res.status(200).json(failedResult);
                console.log('Errorororororor');
            }
        });
    }

}

module.exports = {
    addOrUpdateIdea: addOrUpdateIdea
}
