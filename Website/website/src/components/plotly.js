import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';

import { GRAPH_TYPES } from '../containers/graph_type_selection_bar';

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
    const predictedPlotlyData = this.toPredictedPlotlyData();
    return(
      <div className="Plotly">
        <Plot data= { [ ...plotlyData, ...predictedPlotlyData ] }
              layout={{
                     autosize: true,
                     legend: {
                        x: -.1,
                        y: 1.2
                      }
                 }}
              useResizeHandler={true}
              style={ { width: "100%", height: "100%" } }
          />
      </div>
    );
  }

}

function mapStateToProps({ timeSeriesList, selectedGraphTypes }, { timeSeriesName }){
  return { timeSeriesList, selectedGraphTypes, timeSeriesName };
}

export default connect(mapStateToProps) (Plotly);
