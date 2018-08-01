import React, { Component } from 'react';
import './app.css';
import SearchBar from './containers/search_bar';
import TimeSeriesList from './containers/time_series_list';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Limen</h1>
        <SearchBar />
        <TimeSeriesList />
      </div>
    );
  }
}

export default App;
