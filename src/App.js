import React, { Component } from 'react';
import Header from './components/Header';
import Books from './components/Books/';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Books />
      </div>
    );
  }
}

export default App;
