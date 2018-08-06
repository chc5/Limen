import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';

class Plotly extends Component {
  constructor(props){
    super(props);
    this.toPlotlyData.bind(this);
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
        'mode': 'markers'
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
