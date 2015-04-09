var dependency = require('../dependency');
var _ = require('lodash');

function addLikeForIdea(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var ideaId = req.body.ideaId;
    var likedBy = req.body.likedBy;
    if (_.isEmpty(ideaId)) {
        res.status(500).json('Idea id not passed to like function!!!!!!!');
        return;
    }

    Idea.update({
            '_id': dependency.getObjectId(ideaId)
        }, {
            $addToSet: {
                likes: [likedBy]
            }
        }, {},
        function(err, noOfDocsUpdated) {
            console.log('In  update callback');
            if (!err) {
                console.log('In  update resolve');
                res.status(200).json(noOfDocsUpdated);
            } else {
                console.log('In  update reject');
                res.status(500).json('Could not like the idea : ' + err);
            }
        });
}


function getTheTopLikedIdeas(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var count = 3;

    Idea.aggregate([{
        $unwind: "$likes"
    }, {
        $group: {
            _id: "$_id",
            title: {
                $first: "$title"
            },
            total: {
                $sum: 1
            }
        }
    }, {
        $sort: {
            total: -1
        }
    }, {
        $limit: count
    }], function(err, result) {


        if (!err) {

            res.status(200).json(result);
        } else {

            res.status(500).json('Could not retrive top ideas : ' + err);
        }
    });

}


module.exports = {
    addLikeForIdea: addLikeForIdea,
    getTheTopLikedIdeas: getTheTopLikedIdeas
};
