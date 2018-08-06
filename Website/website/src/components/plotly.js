import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { GRAPH_TYPES } from '../containers/selection_bar';
class Plotly extends Component {
  constructor(props){
    super(props);
    this.toPlotlyData = this.toPlotlyData.bind(this);
    this.getTraceName = this.getTraceName.bind(this);
  }
  getTraceName(keyName){
    const result = Object.keys(GRAPH_TYPES).filter(key => {
      return GRAPH_TYPES[key].key === keyName;
    });
    return result.length > 0 ? GRAPH_TYPES[result[0]].name : "undefined";
  }
  toPlotlyData(){
    const timeSeries = this.props.timeSeriesList[this.props.timeSeriesName];
    const plotlyData = this.props.selectedGraphTypes.map(type => {
      let x = [];
      let y = [];
      Object.keys(timeSeries[type])
            .forEach(key =>{
              x.push(key);
              y.push(timeSeries[type][key]);
            });
      return {
        'x': x,
        'y': y,
        'type': 'scatter',
        'mode': 'markers',
        'name': this.getTraceName(type)
      };
    });
    return plotlyData;
  }
  render(){
    const plotlyData = this.toPlotlyData();
    console.log("Rendering Plotly...");
    return(
      <Plot data= { plotlyData } />
    );
  }
}

function mapStateToProps({ timeSeriesList, selectedGraphTypes }, { timeSeriesName }){
  return { timeSeriesList, selectedGraphTypes, timeSeriesName };
}

export default connect(mapStateToProps) (Plotly);
