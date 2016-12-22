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
		// Connects to Socket
		this.socket = io('http://localhost:3000');
		// Initiates connection callback
		this.socket.on('connect', this.connect.bind(this));
		// Disconnects from Socket
		this.socket.on('disconnect', this.disconnect.bind(this));
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

	// Passing the 
	render() {
		return (
			<div>
				<Header title="Connection (Header)" status={this.state.status}/>
			</div>
		);
	}
};

module.exports = App;