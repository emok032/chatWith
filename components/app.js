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
			messages: [],
			onlineUsers: [],
			isTyping: false,
			otherIsTyping: false
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
		this.socket.on('receive-message', this.receiveMsg.bind(this));
		this.socket.on('online-user', this.onlineUser.bind(this));
		this.socket.on('receive-indicator', this.receiveNote.bind(this));
	}

	onlineUser(serverState){
		const { onlineUsers } = this.state;
		onlineUsers.push(serverState.socketId);
		this.setState({ onlineUsers: onlineUsers });
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

	submitMessage(){
		const message = document.getElementById("message").value;
		this.socket.emit('new-message', message);
		console.log('Sent: ' + message);

	}

	receiveMsg(msg){
		console.log('Received: ' + msg);

		const { messages } = this.state;
	      messages.push(msg);
	      this.setState({messages: messages});
	      console.log({ messages });
	}

	onKeyTyping(event){
		const { isTyping } = this.state;
		const keys = event.target.value

		this.setState({
			isTyping: true
		});

		if(keys === ''){
			this.setState({
				isTyping: false
			});
			console.log({ isTyping });
		}
		const sendNote = {isTyping};
		this.socket.emit('new-typing', sendNote);
	}

	receiveNote(note){
		const { otherIsTyping } = this.state;
		this.setState({ otherIsTyping: note });
		console.log('Receive Note: ' + { otherIsTyping });
	}

	render() {
		const { messages, isTyping, otherIsTyping } = this.state;
		const msgList = messages.map((msg, index) =>
			<li key={index}>
				{msg}
			</li>
		);
		const { onlineUsers } = this.state;
		const userList = onlineUsers.map((user, index) =>
		<li key={index}>
				User Online: {user}
		</li>
		);

		return (
			<div className="Application">
				<Header title={this.state.title} status={this.state.status}/>
				<h2>Online Users</h2>
				<ul>
					Users: {userList}
				</ul>
				<div id="typingStatus">
					{this.state.isTyping ? 'I am typing...' : 'I am NOT typing...'}
					<br />
					{this.state.otherIsTyping ? 'Other user is typing...' : 'Other user is NOT typing...'}
				</div>
				<ul>
					Messages: {msgList}
				</ul>	
				<h1>Chat Input</h1>
				<form>
						<input onChange={this.onKeyTyping.bind(this)} type="text" id="message" autoComplete="off" />
						<button onClick={ this.submitMessage.bind(this)} >Send</button>
						<input type="text" id="user" placeholder="Choose Username" />
				</form>
			</div>
			
		);
	}
};

module.exports = App;