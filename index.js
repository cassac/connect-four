import React, { Component } from 'react';
import { render } from 'react-dom';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: []
    }
  }

  componentWillMount() {
    this.createBoard();
  }

  createBoard() {
    let board = [];
    for (var i = 0; i < 6; i++) {
      let row = []
      for (var j = 0; j < 7; j++) {
        row.push(null);
      }
      board.push(row);
      row = [];
    }
    this.setState({board}, () => {
      console.log(this.state.board);
    })
  }

  render () {
    return (
      <div>
        Hello World
      </div>
    )
  }

}

render(<Game/>, document.getElementById('app'));
