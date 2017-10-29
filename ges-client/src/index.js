import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Top from './components/Top';
import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import Products from './components/Products';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
	<Router>
		<MuiThemeProvider>
			<div>
				<Top />
				<Route exact path="/" component={Dashboard} />
				<Route path="/categories" component={Categories} />
				<Route path="/products" component={Products} />
			</div>
		</MuiThemeProvider>
    </Router>,
  document.getElementById('app')
);
