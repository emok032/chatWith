// Express Configuration =============================================================================
var express = require('express');
var app = express();

// Middleware ========================================================================================
app.use(express.static('./public')); // serve files from static folder ('public')
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
// Incorporating socket.io to the server that is getting returned from the .listen call
var io = require('socket.io').listen(server); // Creating another server - a 'socket server' that is also listening on Port 3000
// Adding event listener for a connection - when a socket gets connected
io.sockets.on('connection', function(socket) { // callback function handling socket connection
	// Upon socket connection, log ID of connection
	console.log("Connected: %s", socket.id);
});	
console.log("Polling server is running at 'http://localhost:3000'");

