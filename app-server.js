// Express Configuration =============================================================================
var express = require('express');
var app = express();

// Tracking Socket (Connection)
var connections = [];
var title = 'title placeholder';
var socketId = '';

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
		// Remove disconnected socket from connections array
		connections.splice(connections.indexOf(socket), 1); // removing '1' socket at a time
		// client may have disconnected socket *but server has not fully yet
		socket.disconnect(); // invoke server disconnect
		// Connections left
		console.log('Disconnected: %s sockets still connected', connections.length);
		// Remove disconnected socketId from socketId array
		// socketId.splice(socket.id, 1);
		// socket.emit('online-user', {
		// 	socketId: socketId
		// });
		// console.log('Disconnected - onlineUser: ', socketId);
	});

	socket.on('new-message', function(msg){
		io.emit('receive-message', msg);
	});
	socket.on('new-typing', function(note) {
		const socketId = socket.id;
		var i = 0;
		for (i = 0; i < 1; i++) {
			if(note === true){
				io.emit('receive-indicator', note, socketId);
			}
		}
		if (note === false){
				io.emit('receive-indicator', note, socketId);
				i = 0;
			}
	});

	// Emit event 'welcome' --------------------------------------------------------------------------
	socket.emit('welcome', {
		title: title
	});

	// Upon Connect to Socket ------------------------------------------------------------------------
	connections.push(socket);
	// Connections currently
	console.log("Connected: %s sockets connected", connections.length, socket.id);
	
	// socketId.push(socket.id);
	// socket.emit('online-user', {
	// 	socketId: socketId
	// });
	// console.log(socketId);
});	

console.log("Polling server is running at 'http://localhost:3000'");

