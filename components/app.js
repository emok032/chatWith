// App - Will handle entire application's state
import React, { Component, cloneElement } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import io from 'socket.io-client';
import Header from './parts/header';
import Buyers from './Buyers';
import Seller from './Seller';

class App extends React.Component {
	// (1) Load App >> (2) Connect to Socket
	constructor(props){
		super(props);
		// Set App initial/default states:
		this.state = {
			status: '',
			title: '',
			message: []
		};

	}

	componentWillMount() {
		// Connects to Socket
		this.socket = io('http://localhost:3000');
		// Initiates connection callback
		this.socket.on('connect', this.connect.bind(this));
		// Disconnects from Socket
		this.socket.on('disconnect', this.disconnect.bind(this));
		// Emit 
		this.socket.on('welcome', this.welcome.bind(this));	
	}

	componentDidMount() {
		this.socket.emit('test');
	}

	// Connect (handler)
	connect() {
		// Update state: status to 'conncted'
		this.setState({ status: 'connected' });
	}
	// Disconnect (handler)
	disconnect() {
		this.setState({ status: 'disconnected'});

	}
	// Emit 'welcome' (handler)
	welcome(serverState) {
		this.setState({ title: serverState.title });
	}

	render() {

		return (
			<div className="Application">
				<Header title={this.state.title} status={this.state.status}/>
				
				<h1>Chat Window</h1>
					<form action="">
						<input type="submit" value="Submit" id="m" autoComplete="off" /><button>Send</button>
					</form>
			</div>
			
		);
	}
};

module.exports = App;