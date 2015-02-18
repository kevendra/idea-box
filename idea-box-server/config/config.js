module.exports = {
    idea: {
        list: require('../api/idea/list').list,
        addOrUpdateIdea: require('../api/idea/add').addOrUpdateIdea 
    },
    user: {
    	saveOrUpdateThirdPartyUser: require('../api/user/add').saveOrUpdateThirdPartyUser
    }
};
