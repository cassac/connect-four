import React from 'react';

const createGame = ({goToGameRoom, changeHandler}) => (
  <div>
    <h3>Create Game</h3>
    <input 
      type='text' 
      onChange={ changeHandler }
    />
    <input 
      onClick={ goToGameRoom }
      type='submit' 
      value='Create Game' 
    />
  </div>
)

export default createGame;