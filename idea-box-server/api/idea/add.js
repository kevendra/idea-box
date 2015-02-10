var dependency = require('../dependency');
var _ = require('lodash');

function addOrUpdateIdea(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var title = req.body.title;
    var description = req.body.description;
    var category = req.body.category;
    var createdOn = new Date();
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
                doc.save(function(err, doc) {

                    if (!err) {
                        //res.sendStatus(200);
                        deferred.resolve(doc);
                        console.log(JSON.stringify(doc));
                    } else {
                        res.sendStatus(500);
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
        idea.save(function(err, doc) {
            console.log('Error is **** ' + err);
            if (!err) {
                // res.sendStatus(200);
                deferred.resolve(idea);
                console.log(JSON.stringify(doc));
            } else {
                res.sendStatus(500);
                console.log('Errorororororor');
            }
        });
    }


    deferred.promise.then(function(doc) {
        if (req.body.parentId) {
            dependency.getIdeaModel().findOne({
                _id: new dependency.getObjectId(req.body.parentId)
            }, function(err, parentDoc) {
                if (!err && doc) {
                	console.log('********************');
                	console.log('Parent Id is ********* ' + parentDoc._id);
                	console.log('********************');
                	console.log('********************');
                	console.log(JSON.stringify(parentDoc.ideaList));
                	console.log('********************');
                	//parentDoc.ideaList.push(new dependency.getObjectId(doc._id));
                	parentDoc.ideaList.push(doc);
                    console.log('********************');
                	console.log(JSON.stringify(parentDoc.ideaList));
                	console.log('********************');
                    parentDoc.save(function(err, doc) {
                        if (!err) {
                            res.sendStatus(200);
                            console.log('parent dosc is **********' + JSON.stringify(parentDoc));
                        } else {
                            res.sendStatus(500);
                            console.log('Errorororororor');
                        }

                    });

                }
            });
        }else {
        	res.sendStatus(200);
        }
    });



}

module.exports = {
    addOrUpdateIdea: addOrUpdateIdea
}
