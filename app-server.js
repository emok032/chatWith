// Express Configuration =============================================================================
var express = require('express');
var app = express();
var path = require('path');

// Tracking Socket (Connection)
var connections = [];
var title = 'ChatWith';
var socketId = '';
var onlineUsers = [];

// Middleware ========================================================================================
app.use(express.static('./public')); // serve files from static folder ('public')
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public/index.html'));
})

// Socket API ========================================================================================
// Incorporating socket.io to returned server
var io = require('socket.io').listen(server); // Creating another server - a 'socket server' that is also listening on Port 3000
// Adding event listener for a connection - when a socket gets connected
io.sockets.on('connection', function(socket) { // callback function handling socket connection
	// On Disconnect from Socket ---------------------------------------------------------------------
	socket.once('disconnect', function() {
		// Remove disconnected socket from connections array
		connections.splice(connections.indexOf(socket), 1); // removing '1' socket at a time

		onlineUsers.splice(onlineUsers.indexOf(socket.id), 1);
		// Update application state of disconnected users
		socket.on('toggle-online', function() {
			// callback function to send updated array of connected users
			io.emit('online-users', {
				onlineUsers: onlineUsers
			})
		});
		console.log("Disconnected-onlineUsers: ", onlineUsers);

		// Client may have disconnected socket but server has not fully yet
		// So, actively invoke server disconnect
		socket.disconnect();
		// Connections still left
		console.log('A socket(s) Disconnected: %s sockets still connected', connections.length);

	});

	socket.on('new-message', function(msg){
		io.emit('receive-message', msg);
	});
	socket.on('new-typing', function(note) {
		const socketId = socket.id;
		if(note === true){
				io.emit('receive-indicator', note, socketId);
			}
		
		if (note === false){
				io.emit('receive-indicator', note, socketId);
			}
	});

	// Emit event 'welcome' --------------------------------------------------------------------------
	socket.emit('welcome', {
		title: title
	});

	// Upon Connect to Socket ------------------------------------------------------------------------
	connections.push(socket);
	// Connections currently
	console.log("A socket has connected: %s sockets connected", connections.length, socket.id);

	// Update application state with current online users
	onlineUsers.push(socket.id);
	socket.emit('online-users', {
		onlineUsers: onlineUsers
	});
});	

console.log("Polling server is running at 'http://localhost:3000'");

