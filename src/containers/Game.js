import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { detectWin } from '../util/detect';
import createBoard from '../util/createBoard';
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
    this.initiateBoard();
  }

  initiateBoard() {
    this.setState({ board: createBoard() });
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
          this.initiateBoard();
        }
      }
    );

  }

  displayBoard() {
    const style = {
      height: '4em',
      width: '4em',
      margin: '1em',
      textAlign: 'center',
      display: 'block',
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
        <div style={{'position': 'relative', 'left': '26%'}}>
          <div style={{'display':'flex', 'width': '50%', 'justifyContent': 'space-around'}}>
            {this.displayBoard()}
          </div>
        </div>
        <Footer 
          turn={this.state.turn} 
          player={this.state.player}
        />
      </div>
    )
  }

}

export default Game;