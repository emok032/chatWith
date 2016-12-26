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
			otherIsTyping: false,
			userId: ''
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
		this.socket.on('online-users', this.onlineUsers.bind(this));
	}

	componentWillUpdate() {
		this.socket.on('receive-indicator', this.receiveNote.bind(this));
	}

	onlineUsers(serverState)	{
		this.setState({ onlineUsers: serverState.onlineUsers });
	}

	receiveToggle(toggle) {
		this.setState({ onlineUsers})
	}

	senderId(socketId){
		const { userId, isTyping } = this.state;
		this.setState({ userId: socketId });

		if({isTyping} === true) {
			this.setState({ userId: socketId });
		} else if({isTyping} === false) {
			this.setState({ userId: '' });
		}
	}

	// Connect (handler)
	connect() {
		// Update state: status to 'conncted'
		this.setState({ status: 'connected' });
	}
	// Disconnect (handler)
	disconnect() {
		this.setState({ status: 'disconnected'});
		socket.emit('toggle-online');
	}
	// Emit 'welcome' (handler)
	welcome(serverState) {
		this.setState({ title: serverState.title });
	}

	submitMessage(){
		const message = document.getElementById('message').value;
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
		const keys = event.target.value;
		const keysLength = keys.length;
		var i = 0;
		// for-loop: To prevent non-stop requests to server as user types (as key.length increases)
		for (i = 0; i < 1; i++) {
			if(keysLength === 1) {
			this.setState({
				isTyping: true
			});
			const sendTrue = true;
			this.socket.emit('new-typing', sendTrue);
			console.log("User is typing: " + { isTyping });
			}
		}
		if(keys === ''){
			this.setState({
				isTyping: false
			});
			const sendFalse = false;
			console.log("NOT typing: " + { isTyping });
			this.socket.emit('new-typing', sendFalse);
			i = 0;
		}
	}

	receiveNote(note, socketId){
		const { otherIsTyping, userId } = this.state;
		const username = socketId;
		if(note === true) {
			this.setState({ 
				otherIsTyping: true,
				userId: username
			})
		} else {
			this.setState({ 
				otherIsTyping: false,
				userId: ''
			})
		}
		console.log("Receive Note: " + note);
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
			<div className="container">
			    <div className="row">
			        <div className="col-md-5">
			            <div className="panel panel-primary">
			                <div className="panel-heading">
				<Header title={this.state.title} status={this.state.status}/>
				<h2>Online Users</h2>
				<ul>
					Users: {userList}
				</ul>
				<div id="typingStatus">
					{this.state.isTyping ? 'I am typing...' : 'I am NOT typing...'}
					<br />
					<p>
						
						"{this.state.userId}" {this.state.otherIsTyping ? ' is typing...' : ''}
					</p>
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
						</div>
					</div>
				</div>
			</div>
			
		);
	}
};

module.exports = App;