import React from 'react';

class Seller extends React.Component {
	render() {
		return (
			<h1>Seller: {this.props.status}</h1>
		);
	}
}

module.exports = Seller;