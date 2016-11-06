import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';

class App extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    injectTapEventPlugin();
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App;