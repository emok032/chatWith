// Express Configuration =============================================================================
var express = require('express');
var app = express();

// Tracking Socket (Connection)
var connections = [];
var title = 'title placeholder';

// Middleware ========================================================================================
app.use(express.static('./public')); // serve files from static folder ('public')
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);

// Socket API ========================================================================================
// Incorporating socket.io to returned server
var io = require('socket.io').listen(server); // Creating another server - a 'socket server' that is also listening on Port 3000
// Adding event listener for a connection - when a socket gets connected
io.sockets.on('connection', function(socket) { // callback function handling socket connection

	// On Disconnect from Socket ---------------------------------------------------------------------
	socket.once('disconnect', function() {
		// Remove array from tracking array
		connections.splice(connections.indexOf(socket), 1); // removing '1' socket at a time
		// client may have disconnected socket *but server has not fully yet
		socket.disconnect(); // invoke server disconnect
		// Connections left
		console.log('Disconnected: %s sockets still connected', connections.length);
	});

	socket.on('chat message', function(msg){
		socket.emit('receive message', msg);
	});
	socket.on('test', function() {
		console.log('mounted');
	})

	// Emit event 'welcome' --------------------------------------------------------------------------
	socket.emit('welcome', {
		title: title
	});

	// Upon Connect to Socket ------------------------------------------------------------------------
	connections.push(socket);
	// Connections currently
	console.log("Connected: %s sockets connected", connections.length);
});	

console.log("Polling server is running at 'http://localhost:3000'");

