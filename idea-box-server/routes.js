
var idea = require('./config/config').idea;
var user = require('./config/config').user;

function routes(app) {
    app.get('/api/idea/idea-list.json', idea.list);
    app.get('/api/idea/top-ideas.json', idea.getTheTopLikedIdeas);
    app.post('/api/idea/add-update-idea.json', idea.addOrUpdateIdea);
    app.post('/api/idea/like', idea.likeIdea);
    app.post('/api/user/add-update-user.json', user.saveOrUpdateThirdPartyUser);
    app.get('/api/user/get-logged-in-user.json', user.getLoggedInUser);

}
module.exports = routes;
