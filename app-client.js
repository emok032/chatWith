import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>

		</Route>
	</Router>
), document.getElementById('app'));

