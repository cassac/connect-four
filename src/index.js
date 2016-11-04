import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Game from './containers/App';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Game} />
  </Router>, 
  document.getElementById('app')
);