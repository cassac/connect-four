import React from 'react';
import { browserHistory } from 'react-router';

const NotFound = () => {
  const redirectToHome = () => {
    setTimeout(() => {
      browserHistory.push('/');
    }, 3000)
  }
  return (
    <div>
      <p>The page you are looking for was not found. Redirecting in 3, 2, 1...</p>
      { redirectToHome() }
    </div>
  )
}

export default NotFound;