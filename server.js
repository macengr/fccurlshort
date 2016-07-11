'use strict';

var express = require('express');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/data';
var isUri = require('isuri');
var shortid = require('shortid');


var app = express();
var toBeShort;
var port = process.env.PORT || 8080;


app.use(function(request, response) {
    
    toBeShort = request.url;
    toBeShort = toBeShort.slice(1);

    
    console.log("In comes a request to: " + request.url);
    console.log("URL = " + toBeShort);
    
    
    var dude = isUri.isValid(toBeShort);
    console.log("This URL is " + dude);
    
    
    // check to see if it's a request for the home page
    
    if(request.url === "/") {
      response.sendFile(process.cwd() + '/index.html');   
    } else if(dude === true) {  // if it is a valid URL
        
        var newURL = shortid.generate();
        
        MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
        
        
        
        
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify( { "original_url" : toBeShort, "short_url": newURL }));
    } else {   // Not Valid so outut Error message
         response.writeHead(200, { 'Content-Type': 'application/json' });
         response.end("ERROR - Invalid URL; Try again");
    }
    	

});

app.listen(port, function () {
    console.log('Listening on port 8080...');
});

