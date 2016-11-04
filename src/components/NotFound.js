import React from 'react';
import { browserHistory } from 'react-router';

const NotFound = () => {
  
  return (
    <div>
      The page you are looking for was not found.
      Redirecting in 3, 2, 1...
      {
        setTimeout(() => {
          browserHistory.push('/');
        }, 3000)
      }
    </div>
  )
}

export default NotFound;