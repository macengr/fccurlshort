'use strict';

var express = require('express');
var isUri = require('isuri');


var app = express();
var toBeShort;
var port = process.env.PORT || 8080;


app.use(function(request, response) {
    
    toBeShort = request.url;
    toBeShort = toBeShort.slice(1);
    var date = null;
    
    console.log("In comes a request to: " + request.url);
    console.log("URL = " + toBeShort);
    
    
    var dude = isUri.isValid(toBeShort);
    console.log("This URL is " + dude);
    
    
    // check to see if it's a request for the home page
    
    if(request.url === "/") {
      response.sendFile(process.cwd() + '/index.html');   
    } else if(dude === true) {  // if it is a number convert to unix date
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify( { "original_url" : toBeShort, "short_url": toBeShort }));
    } else {
         response.writeHead(200, { 'Content-Type': 'application/json' });
         response.end("Invalid URL; Try again");
    }
    	

});

app.listen(port, function () {
    console.log('Listening on port 8080...');
});

