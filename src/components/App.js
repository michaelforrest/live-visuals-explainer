import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Chart width={1920} height={1080}/>
      </div>
    );
  }
}

export default App;
