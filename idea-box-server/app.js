var express = require('express'),
    http = require('http'),
    path = require('path');
var ejs = require('ejs');

var request = require("request");
var cookie = require('cookie');
var basicAuth = require('basic-auth-connect');
var cookieParser = require('cookie-parser');
var faviconExpress = require("serve-favicon");
var bodyParserExpress = require("body-parser");
var sessionExpress = require("cookie-session");
var loggerExpress = require("morgan");
var mongoose = require('mongoose');
var staticExpress = require("serve-static");




var app = express();
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));
//app.use(staticExpress(path.join(__dirname, 'public')));
app.set('port', 3000);
app.use(cookieParser());
app.use(sessionExpress({
    secret: '1234567890'
}));

app.use(loggerExpress('dev'));
app.use(bodyParserExpress.json({}));
app.use(bodyParserExpress.urlencoded({
    extended: true
}));


var username = "admin";
var password = "iamadmin123";
app.use('/api/admin/idea', basicAuth(username, password));

mongoose.connect('mongodb://localhost:27017/ideabox');
mongoose.model('Idea', require('./models/idea').Idea);
mongoose.model('User', require('./models/user').User);

var security = require('./config/config').security;

security.oauthInitialization.initialize(app);
security.githubStratergy.initialize(app);
security.securityChain.initialize(app);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



var route = require('./routes');
route(app);
// app.get('/api/idea/idea-list.json', idea.list);
// app.post('/api/idea/add-update-idea.json', idea.addOrUpdateIdea);
// app.post('/api/user/add-update-user.json', user.saveOrUpdateThirdPartyUser);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;
