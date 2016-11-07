import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  button: {
    margin: 12
  },
  div: {
    marginTop: '3em'
  }
};

const createGame = ({goToGameRoom, changeHandler}) => (
  <div style={style.div}>
    <h3>Create a Game</h3>
    <TextField
      name='roomName'
      placeholder='Room Name'
      onChange={changeHandler}
    />
    <RaisedButton 
      onClick={goToGameRoom}
      label="Go!" 
      style={style.button} 
      backgroundColor='#00BCD4'
      labelColor='#FFF'
    />
  </div>
)

export default createGame;