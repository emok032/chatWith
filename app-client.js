import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import Buyers from './components/Buyers';
import Seller from './components/Seller';
import Estate from './components/Estate';
import Header from './components/parts/header';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="buyers" component={Buyers} />
			<Route path="seller" component={Seller} />
			<Route path="estate" component={Estate} />
		</Route>
	</Router>
), document.getElementById('app'));

