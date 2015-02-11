var express = require('express')
  , http = require('http')
  , path = require('path')
  , _ =require('underscore') 
  , ObjectID = require('mongodb').ObjectID;
  var ejs = require('ejs');

var MongoClient = require('mongodb').MongoClient;
  var request = require("request");
  var cookie = require('cookie');
  var basicAuth = require('basic-auth-connect');  
  var cookieParser = require('cookie-parser');
  var faviconExpress = require("serve-favicon");
  var sessionExpress = require("cookie-session");
  var loggerExpress = require("morgan");
  var bodyParserExpress = require("body-parser");
  var methodOverrideExpress = require("method-override");
  var staticExpress = require("serve-static");
  var compress = require('compression')();
  var username = "admin";
  var password = "iamadmin123";


var deleteIdea = function(db,title,callback){
  var collection = db.collection('ideas');
  collection.remove({"title":title},function(err,result){
     callback(err);
  });
};
var unflatten = function(array,parent,tree){
  tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { _id: 0 };
        
    var children = _.filter( array, function(child){ return child.parentId == parent._id; });
    
    if( !_.isEmpty( children )  ){
        if( parent._id == 0 ){
           tree = children;   
        }else{
           parent['ideaList'] = children
        }
        _.each( children, function( child ){ unflatten( array, child ) } );                    
    }
    
    return tree;
}
var addParentIdIfMissing = function(array){
   _.each( array, function( item ){
       if(item && ! item.parentId){
           item.parentId = 0;
       }      
    });
    return array;
}

var findIdeas = function(db, callback,req) {
  var collection = db.collection('ideas');
  // Find some documents
 var filter = {};
  var category = req.query.category;
 if(category){
  filter = {category:category};
}
collection.find(filter,{},{sort:[["createdOn","desc"]]}).toArray(function(err, ideas) {
    console.log("Found the following records");
    tree = unflatten( addParentIdIfMissing(ideas) );
    callback(tree);
  });
}
var persistIdea = function(ideaData,db,callback){
 var collection = db.collection('ideas');
  collection.update({_id:ideaData._id},ideaData,{upsert:true},function(err,result){
   callback(result,err);
});
}
  
var connect = require('connect');
var app = express();
var url = 'mongodb://localhost:27017/ideabox';

  app.set('port', process.env.PORT || 8090);
  app.set('views', __dirname + '/views');
  app.engine('html',ejs.renderFile);
  app.set('view engine','html');
  app.use(cookieParser());
  app.use(sessionExpress({secret: '1234567890'}));
  app.use('/api/admin/idea',basicAuth(username,password));
  app.use(loggerExpress('dev'));
  app.use(bodyParserExpress.json({}));
  app.use(bodyParserExpress.urlencoded({extended:true}));
  app.use(methodOverrideExpress());
  app.use(compress);
  app.use(staticExpress(path.join(__dirname, 'public')));
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
 app.delete('/api/admin/idea',function(req,res){
      var title = req.query['title'];
       MongoClient.connect(url,function(err,db){
                deleteIdea(db,title,function(err){
		if(err == null){

                     var result = {
             "status":"SUCCESS",
             "error": null
             };
    
                   res.write(JSON.stringify(result));
                 }
                 db.close();
                  res.end();
      });  
        }  
       );
     
      res.end();

});  
  
  app.get('/api/idea/idea-list.json',function(req,res){

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  findIdeas(db,function(ideas){
       var result = {
             "status":"SUCCESS",
             "data":{
                ideaList:ideas
             },
  "error": null
        };
       res.write(JSON.stringify(result));
       db.close();
        res.end();
  },req);
  
});
  });
app.post('/api/idea/add-update-idea.json',function(req,res){
     var title = req.body.title;
     var description=req.body.description;
     var category = req.body.category;
     var parentId = req.body.parentId;
     var id = new ObjectID(req.body._id);
      
    var createdDate = new Date();
     var ideaData = {
		"title":title,
                "description":description,
                "category":category,
                "createdOn":createdDate,
                "parentId":parentId,
                "_id":id
      };
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  persistIdea(ideaData,db,function(data,err){
    if(err == null){

     var result =  { "status": "SUCCESS",
  "data": {
  },
  "msg": [
    {
      "type": "success",
      "value": [
        {
          "title": "Saved successfully",
          "text": "",
          "param": null
        }
      ]
    }
  ],
  "error": null
    };
     res.write(JSON.stringify(result))
     }
     else{
    var result =  { "status": "FAILED",
  "data": {
  },
  "msg": [
    {
      "type": "danger",
      "value": [
        {
          "title": "Error",
          "text": "idea not saved",
          "param": null
        }
      ]
    }
  ],
  error:"failed"
};
          res.write(JSON.stringify({message:err,status:500,"success":false}))
     }
     db.close();
     res.end();
  });

});

  
});
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
