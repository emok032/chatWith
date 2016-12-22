import React from 'react';
import io from 'socket.io-client';
import Header from './parts/header';

class App extends React.Component {
	// (1) Load App >> (2) Connect to Socket
	constructor(props){
		super(props);
		// App initial state of: disconnected
		this.state = {
			status: 'disconnected' // To be passed down component <Header> as a property
		};
	}

	componentWillMount() {
		// Connects to Socket.io
		this.socket = io('http://localhost:3000');
		// Initiates connection callback
		this.socket.on('connect', this.connect.bind(this));
	}

	connect() {
		// Update state: status to 'conncted'
		this.setState({ status: 'connected' });
	}

	// Passing the 
	render() {
		return (
			<div>
				<Header title="New Header" status={this.state.status}/>
			</div>
		);
	}
};

module.exports = App;