import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: ''
    }
  }

  goToGameRoom() {
    browserHistory.push('/game/'.concat(this.state.room));
  }


  render() {
    const styles = {
      root: {
        display: 'flex',
        'flexDirection': 'row',
        'flexWrap': 'wrap',
        'justifyContent': 'center'
      },
    };
    return (
      <div>
        <h3>Join a Game:</h3>
        <p>List active games here...</p>
        <h3>Create Game</h3>
        <input 
          type='text' 
          onChange={(e) => this.setState({room: e.target.value})}
        />
        <input 
          onClick={this.goToGameRoom.bind(this)}
          type='submit' 
          value='Create Game' 
        />
      </div>
    )
  }
}