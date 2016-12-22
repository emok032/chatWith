import React from 'react';
import io from 'socket.io-client';


class App extends React.Component {

	componentWillMount() {
		this.socket = io('http://localhost:3000');
		this.socket.on('connect', this.connect);
	}

	connect() {
		console.log("Connected: " + this.socket.id);
	}

	render() {
		return (
			<div><h1>Hello, React World</h1></div>
		);
	}
};

module.exports = App;