import React, { Component } from 'react';
import { render } from 'react-dom';
import Example from './Example';
import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Example/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
