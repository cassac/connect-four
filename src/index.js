import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import Game from './containers/Game';

render(
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path='/game/:gameRoom' component={Game} />
    </Route>
  </Router>, 
  document.getElementById('app')
);