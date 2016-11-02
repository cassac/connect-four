import React, { Component } from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { detectWin, verticalWin, horizontalWin, majorDiagonalWin, minorDiagonalWin } from './util/detect';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      turn: 'a'
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    this.createBoard();
  }

  createBoard() {
    let board = [];
    for (var i = 0; i < 7; i++) {
      let row = []
      for (var j = 0; j < 6; j++) {
        let idx = String(i).concat(String(j));
        row.push({id: idx, owner: null});
      }
      board.push(row);
      row = [];
    }
    this.setState({board});
  }

  turnHandler(e) {
    const board = this.state.board;
    const col = Number(String(e.target.id)[0]);
    let turn = this.state.turn;

    for (var j = 5; j >= 0; j--) {
      if (!board[col][j].owner) {
        board[col][j].owner = turn;
        break;
      }
    }

    this.setState({
      board,
      turn: turn === 'a' ? 'b' : 'a',
    },
      () => {
        if (detectWin(board, turn)) {
          setTimeout(()=> {
            alert('Player "' + turn + '" wins!');
            this.createBoard();
          }, 200)
        }
      }
    );

  }

  displayBoard() {
    const style = {
      height: 25,
      width: 25,
      margin: 2,
      textAlign: 'center',
      display: 'inline-block',
    };

    return this.state.board.map((row, idx )=> {
      return (
        <div key={idx} style={{'flexDirection':'row'}}>
          { row.map(col => {
            let color = null;
            if (col.owner === 'a') color = 'red';
            else if (col.owner === 'b') color = 'blue';
            return (
              <Paper 
                key={col.id} 
                id={col.id}
                style={Object.assign({}, style, {'backgroundColor': color})} 
                zDepth={2} 
                circle={true} 
                onClick={this.turnHandler.bind(this)}
              /> 
            )
          })}
        </div>
      )
    })

  }

  render () {
    return (
      <div style={{'display':'flex', 'width': '200px', 'justifyContent': 'space-around'}}>
        {this.displayBoard()}
      </div>
    )
  }

}

Game.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

render(<Game/>, document.getElementById('app'));