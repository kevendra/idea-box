var _ = require('lodash');
var dependency = require('../dependency');
var Q = require('q');
var _consideredIds_ = [];
var totalIdeas;


var addParentIdIfMissing = function(array) {
    _.each(array, function(item) {
        if (item && !item.parentId) {
            item.parentId = 0;
        }
    });
    return array;
};


var unflatten = function(array, parent, tree) {
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : {
        _id: 0
    };

    var children = _.filter(array, function(child) {
        return child.parentId == parent._id;
    });

    if (!_.isEmpty(children)) {
        if (parent._id == 0) {
            tree = children;
        } else {
            parent['ideaList'] = children
        }
        _.each(children, function(child) {
            unflatten(array, child)
        });
    }

    return tree;
};



module.exports = {
    'unflatten': unflatten,
    'addParentIdIfMissing': addParentIdIfMissing
}
