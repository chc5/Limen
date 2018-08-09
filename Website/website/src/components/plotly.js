import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { GRAPH_TYPES } from '../containers/selection_bar';
class Plotly extends Component {
  constructor(props){
    super(props);
    this.toPlotlyData = this.toPlotlyData.bind(this);
    this.toPredictedPlotlyData = this.toPredictedPlotlyData.bind(this);
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
    console.log("Currently checking TimeSeries", timeSeries);
    const plotlyData = this.props.selectedGraphTypes.map(type => {
      let scatter = {
        'x': timeSeries[type]['data']['x'],
        'y': timeSeries[type]['data']['y'],
        'type': 'scatter',
        'mode': 'markers',
        'name': this.getTraceName(type)
      };
      return scatter;
    });
    return plotlyData;
  }
  toPredictedPlotlyData(){
    const timeSeries = this.props.timeSeriesList[this.props.timeSeriesName];
    const predictedPlotlyData = this.props.selectedGraphTypes.map(type => {
      let x = timeSeries[type]['data']['x'].sort();
      console.log(x);
      return {
        'x': x,
        'y': timeSeries[type]['predicted']['y'],
        'type': 'scatter',
        'mode': 'lines',
        'name': this.getTraceName(type)+' Trendline'
      };
    });
    return predictedPlotlyData;
  }
  render(){
    const plotlyData = this.toPlotlyData();
    // const plotlyData = [];
    const predictedPlotlyData = this.toPredictedPlotlyData();
    // const predictedPlotlyData = [];
    console.log("Rendering Plotly...");
    return(
      <Plot data= { [ ...plotlyData, ...predictedPlotlyData ] } />
    );
  }
}

function mapStateToProps({ timeSeriesList, selectedGraphTypes }, { timeSeriesName }){
  return { timeSeriesList, selectedGraphTypes, timeSeriesName };
}

export default connect(mapStateToProps) (Plotly);
