import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import App from './components/app';
import Buyers from './components/Buyers';
import Seller from './components/Seller';
import Estate from './components/Estate';


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="/Buyers" component={Buyers} />
		<Route path="/seller" component={Seller} />
		<Route path="/estate" component={Estate} />
	</Router>
), document.getElementById('app'));

