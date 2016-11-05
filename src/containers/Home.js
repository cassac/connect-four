import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';

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
    return (
      <div>
        <div>
          Intro Here  
        </div>
        <div>
          <div>
            <div>
              Join a game
            </div>
            <Divider />
            <h4>Create Game</h4>
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
        </div>
      </div>
    )
  }
}