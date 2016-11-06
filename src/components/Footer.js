import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


const Footer = ({turn, player}) => {

  const userPlayer = <FontIcon className="material-icons">{ player }</FontIcon>;
  const redsTurn = <FontIcon className="material-icons">RED'S</FontIcon>;
  const bluesTurn = <FontIcon className="material-icons">BLUE'S</FontIcon>;
  const whoseTurn = () => turn === 'a' ? 1 : 2;

  return (
    <Paper zDepth={1} style={{'position': 'absolute', 'bottom': '0px', 'width': '100%'}}>
      <BottomNavigation selectedIndex={whoseTurn()}>
        <BottomNavigationItem
          icon={userPlayer}
          label={'YOUR TEAM'}
        />
        <BottomNavigationItem
          icon={redsTurn}
          label={'TURN'}
        />
        <BottomNavigationItem
          icon={bluesTurn}
          label={'TURN'}
        />

      </BottomNavigation>
    </Paper>
  );
}

export default Footer;