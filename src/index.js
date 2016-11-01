import React, { Component } from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: []
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
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 6; j++) {
        if (board[i][j].id === e.target.id) {
          board[i][j].owner = 'a';
        }
      }
    }
    this.setState({board});
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