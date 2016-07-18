'use strict';

var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = require('url');
var mongoUrl = 'mongodb://localhost:27017/shortened';
var isUri = require('isuri');
var shortid = require('shortid');
var app = express();
var toBeShort;
var port = process.env.PORT || 8080;

app.get('/new/*', function(request, response, next) {
    

    var toBeShort = request.params[0];
    console.log(toBeShort);
    
    var dude = isUri.isValid(toBeShort);
    console.log("This URL is " + dude);
    
    var newURL = shortid.generate();
    
    MongoClient.connect(mongoUrl, function (err, db) {
    	
    	if (err) {
    		console.log('Unable to connect to the mongoDB server. Error:', err);
    	
     	} else if (dude === true) {

    		console.log('Connection established to', mongoUrl);
 
    		var newOne = {original_url: toBeShort, short_url: newURL};
    		
    		db.collection('shorturls').insert(newOne, function (err, result) {
    		    
    			if (err) {
    				console.log(err);
    			} else {
    				console.log('Inserted 1 document');
    			}
    			
    			});

          response.end(JSON.stringify( { "original_url" : toBeShort, "short_url": newURL } ));

     	//Close connection
        db.close();

    } else {   // Not Valid so outut Error message
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end("ERROR - Invalid URL; Try again");
    } 

    });

});


app.get('/', function(request, response, next) {
		
      response.sendFile(process.cwd() + '/index.html');   

});


app.get('/*', function(request, response, next) {
		

     
    	var getURL = request.params[0];
    	console.log("shortened = " + getURL);
    	
    	
    	// check db to see if short url exists
    	
    	MongoClient.connect(mongoUrl, function (err, db) {
    	if (err) {
    		console.log('Unable to connect to the mongoDB server. Error:', err);
    	} else {
    		console.log('Connection established to', mongoUrl);
    		
    		var collection = db.collection('shorturls');
    	
    		collection.findOne({"short_url": getURL}, function (err, doc){
    				
    		if (err) {
    			console.log('Unable to connect to the mongoDB server. Error:', err);
    		} else if (doc) {
    			// found an entry in the DB, redirect the user to their destination
    			response.redirect(doc.original_url);
    		} else {
    			// nothing found, error message
    			response.writeHead(200, { 'Content-Type': 'application/json' });
    			response.end(JSON.stringify("Invalid Shortcut; Try again"));
      		}
      	});

  	}
  	db.close();
  	
  	
});
		


});



 

app.listen(port, function () {
    console.log('Listening on port 8080...');
});

