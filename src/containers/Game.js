import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { detectWin } from '../util/detect';
import Footer from '../components/Footer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      board: [],
      player: '',
      turn: 'a'
    }
    this.state.socket.on('join', (data) => {
      this.state.player = data;
    })
    this.state.socket.on('turn', (data) => {
      this.turnDispatch(data)
    })

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
    let turn = this.state.turn;
    if (turn !== this.state.player) return;
    const board = this.state.board;
    const col = Number(String(e.target.id)[0]);
    this.state.socket.emit('turn', {board, col, turn});
    this.turnDispatch({board, col, turn})
  }

  turnDispatch(data) {
    const { board, col, turn } = data;

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
          alert('Player "' + turn + '" wins!');
          this.createBoard();
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
      <div>
        <div style={{'display':'flex', 'width': '200px', 'justifyContent': 'space-around'}}>
          {this.displayBoard()}
        </div>
        <Footer 
          turn={this.state.turn} 
        />
      </div>
    )
  }

}

export default Game;