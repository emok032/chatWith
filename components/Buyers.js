import React from 'react';

class Buyers extends React.Component {

	render() {

		const socket = io();
		
			$('form').submit(function(){
				socket.emit('chat message', $('#m').va());
				$('#m').val('');
				return false;
			});
		return (
			

			<div>
				<h1>Buyers: {this.props.title}</h1>
				<form action="">
					<input id="m" autoComplete="off" /><button>Send</button>
				</form>
			</div>
		);
	}
};

module.exports = Buyers;