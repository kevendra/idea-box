module.exports = {
    idea: {
        list: require('../api/idea/list').list,
        addOrUpdateIdea: require('../api/idea/add').addOrUpdateIdea,
        likeIdea: require('../api/idea/like').addLikeForIdea
    },
    user: {
        saveOrUpdateThirdPartyUser: require('../api/user/add').saveOrUpdateThirdPartyUser,
        getLoggedInUser: require('../api/user/userdetails').getLoggedInUser
    },
    security: {
        githubStratergy: require('../api/security/githubStratergy'),
        oauthInitialization: require('../api/security/oauthInitialization'),
        securityChain: require('../api/security/securityChain')
    }
};
