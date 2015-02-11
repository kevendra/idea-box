var dependency = require('../dependency');
var treeStructure = require('./generateTreeStructure');
var _ = require('lodash');

function getIdeaList(req, res, next) {
    var Idea = dependency.getIdeaModel();
    Idea.find({}).lean().exec(function(err, ideas) {
        if (err) {
            res.send(500);
        }
        // res.status(200).json(ideas);
        // var promise = treeStructure.generateTreeStructure(ideas);
        // promise.then(function(ideas) {
        // 		_
        // 		// for(i=0; i < ideas.length ; i++ ) {
        // 		// 	if(_.includes(_consideredIds_, ideas[i]._id)) {
        // 		// 		ideas.splice(i, 1);
        // 		// 	}
        // 		// }

        //         console.log('**********************************');
        //         console.log('****************************');
        //         console.log(JSON.stringify(ideas));
        //         console.log('***************************');
        //         console.log('**********************************');
        //         res.status(200).json(ideas);
        //     })
            //res.status(200).json(treeStructure.generateTreeStructure(ideas));
            res.status(200).json(ideas);
    });

}

module.exports = {
    list: getIdeaList
}
