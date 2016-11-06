import React from 'react';
import { Link } from 'react-router';

const JoinGame = ({pendingGames}) => {
  
  if (!pendingGames.length) return <div></div>;

  return (
    <div>
      <h3>Join a Game:</h3>
      { pendingGames.map((room, idx) => {
        return (
          <div key={idx}>
            <Link to={`/game/${room}`}>{ room }</Link>
          </div>
        )
      })}
    </div>
  )
}

export default JoinGame;