import React from 'react';
import { Link } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const JoinGame = ({pendingGames}) => {
  
  if (!pendingGames.length) return <div></div>;

  return (
    <div>
      <h3>Join a Game</h3>
      { pendingGames.map((room, idx) => {
        return (
          <div key={idx}>
            <Link to={`/game/${room}`}>{ room }</Link>
          </div>
        )
      })}
      <br />
      <Divider 
        inset={true}
      />
    </div>
  )
}

export default JoinGame;