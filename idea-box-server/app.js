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


var app = express();

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

console.log('idea is ' + JSON.stringify(idea));

app.set('port', process.env.PORT || 8090);
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


//mongoose.connect('mongodb://localhost:27017/ideabox2');
//var url = 'mongodb://localhost:27017/ideabox';
mongoose.connect('mongodb://localhost:27017/ideaboxtest');
mongoose.model('Idea', require('./models/idea').Idea);

var idea = require('./config/config').idea;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log('Function is ' + JSON.stringify(idea.list));

app.get('/api/idea/idea-list.json', idea.list);
app.post('/api/idea/add-update-idea.json', idea.addOrUpdateIdea);




http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
