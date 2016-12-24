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
			status: 'disconnected',
			title: ''
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
				{this.props.children}
				
			</div>
			
		);
	}
};

module.exports = App;