var dependency = require('../dependency');
var _ = require('lodash');

function addLikeForIdea(req, res, next) {
    var Idea = dependency.getIdeaModel();
    var ideaId = req.body.ideaId;
    var likedBy = req.body.likedBy;
    if(_.isEmpty(ideaId)) {
    	res.status(500).json('Idea id not passed to like function!!!!!!!');
    	return;
    }

   Idea.update({
            '_id': dependency.getObjectId(ideaId)
        },
        { $addToSet: {likes: [likedBy]} }
        , {},
        function(err, noOfDocsUpdated) {
            console.log('In  update callback');
            if (!err) {
                console.log('In  update resolve');
                res.status(200).json(noOfDocsUpdated);
            } else {
                console.log('In  update reject');
                res.status(500).json( 'Could not like the idea : ' + err);
            }
        });
}


module.exports = {
	addLikeForIdea: addLikeForIdea
};
