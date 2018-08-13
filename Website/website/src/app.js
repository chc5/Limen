import React, { Component } from 'react';
import './app.css';
import SearchBar from './containers/search_bar';
import GraphTypeSelectionBar from './containers/graph_type_selection_bar';
import TimeSeriesList from './containers/time_series_list';
import TimeSeriesButtonGroup from './containers/time_series_button_group';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1 id="title">Limen</h1>
        <SearchBar />
        <GraphTypeSelectionBar className="" />
        <TimeSeriesList className="" />
        <TimeSeriesButtonGroup className="" />
      </div>
    );
  }
}

export default App;
