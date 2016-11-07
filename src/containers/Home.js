import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import JoinGame from '../components/JoinGame';
import CreateGame from '../components/CreateGame';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      pendingGames: [],
      socket: io()
    }
    this.state.socket.on('pending games', (pendingGames) => {
      this.setState({pendingGames});
    })
  }

  componentWillMount() {
    this.state.socket.emit('pending games')
  }

  goToGameRoom() {
    browserHistory.push('/game/'.concat(this.state.room));
    setTimeout(()=> {
    this.state.socket.emit('create game');
      
    }, 200)
  }

  changeHandler(e) {
    this.setState({room: e.target.value})
  }

  render() {
    const styles = {
      'textAlign': 'center',
    };
    return (
      <div style={styles}>
        <JoinGame 
          pendingGames={this.state.pendingGames} 
        />
        <CreateGame 
          goToGameRoom={this.goToGameRoom.bind(this)}
          changeHandler={this.changeHandler.bind(this)}
        />
      </div>
    )
  }
}