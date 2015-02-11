var _ = require('lodash');
var dependency = require('../dependency');
var Q = require('q');
var _consideredIds_ = [];
var totalIdeas;




function generate(ideas) {

    var Q = dependency.getQ();
    var deferred = Q.defer();
    var totalRecords = ideas.length;
    for (var i = 0; i < ideas.length; i++) {
        ideas[i].actualIdeaList = [];
    }
    var tree = [];
    var counter = 1;
    for (var i = 0; i < ideas.length; i++) {
        var idea = ideas[i];
        var stack = [];
        //tree.push(idea);
        stack.push(idea);
        counter = 1;
        while (stack.length > 0) {
            var tempIdea = stack.pop();
            console.log('tempIdea is ' + tempIdea);
            if (tempIdea) {
                counter--;
            }



            if (tempIdea && tempIdea.ideaList && tempIdea.ideaList.length > 0) {
                // for (var j = 0; j < tempIdea.ideaList.length; j++) {
                counter++;
                var inParams = []
                for (var j = 0; j < tempIdea.ideaList.length; j++) {
                    inParams.push(new dependency.getObjectId(tempIdea.ideaList[j].toString()));
                }
                //var childId = tempIdea.ideaList[j].toString();
                var Idea = dependency.getIdeaModel();
                Idea.find({
                    _id: {
                        $in: inParams
                    }
                }, function(err, childIdeas) {
                    console.log('***************' + childIdeas);
                    for (var j = 0; j < childIdeas.length; i++) {
                    	var childIdea = childIdeas[j];
                        if (childIdea) {
                            tempIdea.actualIdeaList.push(childIdea);
                            console.log('****************');
                            console.log('pushed' + JSON.stringify(tempIdea));
                            stack.push(childIdea);
                            //counter++
                        }
                    }



                });
            }
            //}

            if (totalRecords === counter) {
                deferred.resolve(ideas);
            }

        }



    }




    console.log(JSON.stringify(ideas));
    return deferred.promise;


}

function generateTreeStructure(ideas) {
    console.log('In generate!!!!!!!' + ideas.length);

    console.log(JSON.stringify(ideas));
    totalIdeas = ideas.length;
    //var clonedIdeas = _.clone(ideas);


    for (i = 0; i < ideas.length; i++) {
        ideas[i].actualIdeaList = [];
        console.log('Add clonedIdeas actual ' + JSON.stringify(ideas[i]));
    }
    for (i = 0; i < ideas.length; i++) {
        addChildren(ideas[i]);
    }
    // _(ideas).forEach(function(idea) {
    //     addChildren(idea);
    // });


    return deferred.promise;
}

function addChildren(idea) {

    if (_.includes(_consideredIds_, idea._id)) {
        return;
    }



    for (i = 0; i < idea.ideaList.length; i++) {
        console.log('Child is ' + idea.ideaList[i]);
        childId = idea.ideaList[i].toString();
        var Idea = dependency.getIdeaModel();
        Idea.find({
            _id: dependency.getObjectId(childId)
        }, function(err, childIdea) {

            if (childIdea) {
                idea.actualIdeaList.push(childIdea[0]);
                console.log('idea is ' + JSON.stringify(idea));
                console.log('Adding id ' + childIdea[0]._id);
                _consideredIds_.push(childIdea[0]._id);
                console.log('_consideredIds_ length & calling if && total' + _consideredIds_.length + '  ' + totalIdeas);

                console.log(JSON.stringify(idea));
                if (totalIdeas === _consideredIds_.length) {
                    deferred.resolve(_consideredIds_);
                }
                if (childIdea.ideaList && childIdea.ideaList.length > 0) {
                    addChildren(childIdea);
                }

            }


        });

    }
    console.log('Adding id ' + idea._id);
    _consideredIds_.push(idea._id);
    console.log('_consideredIds_ ' + _consideredIds_.length);
    if (totalIdeas === _consideredIds_.length) {
        deferred.resolve();
    }

}


module.exports = {
    'generateTreeStructure': generate
}
