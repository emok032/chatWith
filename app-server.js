var express = require('express');

var app = express();

// Middleware
app.use(express.static('./public')); // serve files from static folder ('public')
app.use(express.static('./node_modules/bootstrap/dist'));

app.listen(3000); // Port Running on localhost:3000
console.log("Polling server is running at 'http://localhost:3000'");

