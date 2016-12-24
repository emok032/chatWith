import React, { Component } from 'react';

class Buyers extends React.Component {

	render() {
		const { title, status } = this.props;

		return (
			<h1>Buyers: {this.state.title}</h1>
		);
	}
};

module.exports = Buyers;