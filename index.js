import React, { Component } from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
    for (var i = 0; i < 6; i++) {
      let row = []
      for (var j = 0; j < 7; j++) {
        row.push('p');
      }
      board.push(row);
      row = [];
    }
    this.setState({board}, () => {
      console.log(this.state.board);
    })
  }

  displayBoard() {
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    return this.state.board.map(row => (
      row.map((col, idx) => <Paper key={idx} style={style} zDepth={1} circle={true} />)
    ));

  }

  render () {
    return (
      <div>
        {this.displayBoard()}
      </div>
    )
  }

}

Game.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

render(<Game/>, document.getElementById('app'));
