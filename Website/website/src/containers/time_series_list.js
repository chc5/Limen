import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/plotly';
import MetaData from './meta_data';

export const META_DATA = "Meta Data";

class TimeSeriesList extends Component{
  constructor(props){
    super(props);
    this.renderMetaData = this.renderMetaData.bind(this);
    this.renderTimeSeries = this.renderTimeSeries.bind(this);
    this.renderTimeSeriesList = this.renderTimeSeriesList.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  renderGraph(timeSeriesName){
    return (
      <Plotly timeSeriesName={timeSeriesName} />
    );
  }

  renderMetaData(metaData){
    return(
      <MetaData metaData={metaData} />
    );
  }

  renderTimeSeries(timeSeriesName){
    let metaDataDisplay = this.renderMetaData(this.props.timeSeriesList[timeSeriesName][META_DATA]);
    let graphDisplay = this.renderGraph(timeSeriesName);
    return (
      <div key={timeSeriesName}>
        {metaDataDisplay}
        {graphDisplay}
      </div>
    );
  }

  renderTimeSeriesList(timeSeriesList){
    const list = Object.keys(timeSeriesList)
                       .map(this.renderTimeSeries);
    return (
      <span>{list}</span>
    );
  }
  render(){
    return (
      <div className='time-series-graph'>
        {this.props.timeSeriesList
          ? (this.renderTimeSeriesList(this.props.timeSeriesList))
          : ("Loading...")
        }
      </div>
    );
  }
}

function mapStateToProps({ timeSeriesList }){
  return { timeSeriesList };
}

export default connect (mapStateToProps) (TimeSeriesList);
