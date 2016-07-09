'use strict';

var express = require('express');
var app = express();
var date;
var natDate;
var unixDate;
var nat;
var port = process.env.PORT || 8080;

app.use(function(request, response) {
    
    date = request.url;
    date = date.slice(1);
    
    console.log("In comes a request to: " + request.url);
    
    // check to see if it's a request for the home page
    
    if(request.url === "/") {
      console.log("Binnnnnggggggooooooooooooooooooooooooooooooooooooo");
        response.sendFile(process.cwd() + '/index.html');   
    } else if(!isNaN(date)) {  // if it is a number convert to unix date
        
        var natDay = new Date(date * 1000).getDate();
        
        var natMonth = new Date(date * 1000).getMonth();
        if (natMonth === 0) {natMonth = "January"}
        if (natMonth === 1) {natMonth = "February"}
        if (natMonth === 2) {natMonth = "March"}
        if (natMonth === 3) {natMonth = "April"}
        if (natMonth === 4) {natMonth = "May"}
        if (natMonth === 5) {natMonth = "June"}
        if (natMonth === 6) {natMonth = "July"}
        if (natMonth === 7) {natMonth = "August"}
        if (natMonth === 8) {natMonth = "September"}
        if (natMonth === 9) {natMonth = "October"}
        if (natMonth === 10) {natMonth = "November"}
        if (natMonth === 11) {natMonth = "December"}
        
        var natYear = new Date(date * 1000).getFullYear();
        var natural = natMonth + " " + natDay + ", " + natYear;
                
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify( { "unix": date, "natural": natural }));
        
    }
    else { // is it a natural date
        nat = date.split("%20");
        
        if(nat.length > 1 && nat.length < 4) { // is it really a date
        	
        	console.log("nat.length = " + nat.length);
       
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct",
        "nov", "dec", "january", "february", "march", "april", "may", "june", "july",
        "august", "september", "october", "november", "december"];

        var checkItUS = nat[0].substring(0).toLowerCase();
        var checkItNonUS = nat[1].substring(0).toLowerCase();

 if (months.indexOf(checkItUS) == -1) {
 	 console.log("not US, checkItNonUS = " + checkItNonUS);
   	if (months.indexOf(checkItNonUS) == -1){
   		console.log("not foreign either");
   		natDate = null;
        unixDate = null;
   	}
   	 checkItNonUS = checkItNonUS.charAt(0).toUpperCase() + checkItNonUS.slice(1);
   	 
   	 if(nat.length < 3) { nat.push(2001); }
   	 if (nat[1].charAt(nat[1].length - 1) == ",") { nat[1].slice(nat[1].length - 1) }
   	 
     natDate = checkItNonUS + " " + nat[0] + ", " + nat[2];
     unixDate = new Date(nat).getTime() / 1000;
     
     
      natDay = new Date(unixDate * 1000).getDate();
        
        natMonth = new Date(unixDate * 1000).getMonth();
        if (natMonth === 0) {natMonth = "January"}
        if (natMonth === 1) {natMonth = "February"}
        if (natMonth === 2) {natMonth = "March"}
        if (natMonth === 3) {natMonth = "April"}
        if (natMonth === 4) {natMonth = "May"}
        if (natMonth === 5) {natMonth = "June"}
        if (natMonth === 6) {natMonth = "July"}
        if (natMonth === 7) {natMonth = "August"}
        if (natMonth === 8) {natMonth = "September"}
        if (natMonth === 9) {natMonth = "October"}
        if (natMonth === 10) {natMonth = "November"}
        if (natMonth === 11) {natMonth = "December"}
        
        natYear = new Date(unixDate * 1000).getFullYear();
        natural = natMonth + " " + natDay + ", " + natYear;
        if (isNaN(unixDate)) {natural = null}
   	console.log("foreign");
 } else {
 	 console.log("US");
 	 checkItUS = checkItUS.charAt(0).toUpperCase() + checkItUS.slice(1);
 	 if(nat.length < 3) { nat.push(2001); }
 	 if (nat[1].charAt(nat[1].length - 1) == ",") { nat[1].slice(nat[1].length - 1) }
 	 
     natDate = checkItUS + " " + nat[1] + ", " + nat[2];
     unixDate = new Date(natDate).getTime() / 1000;
     
        natDay = new Date(unixDate * 1000).getDate();
        
        natMonth = new Date(unixDate * 1000).getMonth();
        if (natMonth === 0) {natMonth = "January"}
        if (natMonth === 1) {natMonth = "February"}
        if (natMonth === 2) {natMonth = "March"}
        if (natMonth === 3) {natMonth = "April"}
        if (natMonth === 4) {natMonth = "May"}
        if (natMonth === 5) {natMonth = "June"}
        if (natMonth === 6) {natMonth = "July"}
        if (natMonth === 7) {natMonth = "August"}
        if (natMonth === 8) {natMonth = "September"}
        if (natMonth === 9) {natMonth = "October"}
        if (natMonth === 10) {natMonth = "November"}
        if (natMonth === 11) {natMonth = "December"}
        
        natYear = new Date(unixDate * 1000).getFullYear();
        natural = natMonth + " " + natDay + ", " + natYear;
        if (isNaN(unixDate)) {natural = null}
 }
        
} else {
    	natural = null;
        unixDate = null;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify( { "unix": unixDate, "natural": natural }));
    }
    	

});

app.listen(port, function () {
    console.log('Listening on port 8080...');
});

