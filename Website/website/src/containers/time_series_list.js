import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/plotly';

export const META_DATA = "Meta Data";
export const INFORMATION = "1. Information";
export const SYMBOL = "2. Symbol";
export const LAST_UPDATE = "3. Last Refreshed";
export const TIME_ZONE = "4. Time Zone";

class TimeSeriesList extends Component{
  constructor(props){
    super(props);
    this.renderMetaData = this.renderMetaData.bind(this);
    this.renderTimeSeries = this.renderTimeSeries.bind(this);
    this.renderTimeSeriesList = this.renderTimeSeriesList.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  renderGraph(timeSeries){
    console.log("renderGraph moment",timeSeries);

    return (
      <Plotly/>
    );
  }

  renderMetaData(metaData){
    return(
      <div key={metaData[INFORMATION]}>
        <h1 key={SYMBOL}> {metaData[SYMBOL]} </h1>
        <h2 key={INFORMATION}> {metaData[INFORMATION]} </h2>
        <h3 key={LAST_UPDATE}> {metaData[LAST_UPDATE]} {metaData[TIME_ZONE]}</h3>
      </div>
    );
  }

  renderTimeSeries(timeSeries){
    let metaDataDisplay = this.renderMetaData(this.props.timeSeriesList[timeSeries][META_DATA]);
    let graphDisplay = this.renderGraph(this.props.timeSeriesList[timeSeries]);
    return (
      <div key={timeSeries}>
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
      <div>
        <div>
          {this.props.timeSeriesList
            ? (this.renderTimeSeriesList(this.props.timeSeriesList))
            : ("Loading...")
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ timeSeriesList, selectedGraphTypes }){
  return { timeSeriesList, selectedGraphTypes };
}

export default connect (mapStateToProps) (TimeSeriesList);
