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
      let col = []
      for (var j = 0; j < 6; j++) {
        let idx = String(i).concat(String(j));
        col.push({id: idx});
      }
      board.push(col);
      col = [];
    }
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
          { row.map(col => <Paper key={col.id} style={style} zDepth={1} circle={true} />) }
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
