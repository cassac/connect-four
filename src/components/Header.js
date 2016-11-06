import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

const Header = () => {
  return (
    <AppBar 
      onTitleTouchTap={() => { browserHistory.push('/') } }
      title='Connect Four'
    />
  )
}

export default Header;