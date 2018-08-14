import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/plotly';
import MetaData from './meta_data';
import Summary from './summary';

export const META_DATA = "Meta Data";

class TimeSeriesList extends Component{

  constructor(props){
    super(props);
    this.renderTimeSeries = this.renderTimeSeries.bind(this);
  }

  renderTimeSeries(timeSeriesName){
    return (
      <div key={timeSeriesName}>
        <MetaData timeSeriesName={timeSeriesName} />
        <Plotly timeSeriesName={timeSeriesName} />
        <Summary timeSeriesName={timeSeriesName} />
      </div>
    );
  }

  render(){
    return (
      <div className='time-series-graph'>
        {this.props.timeSeriesList
          ? (this.renderTimeSeries(this.props.selectedTimeSeries))
          : ("")
        }
      </div>
    );
  }
  
}

function mapStateToProps({ selectedTimeSeries, timeSeriesList }){
  return { selectedTimeSeries, timeSeriesList };
}

export default connect (mapStateToProps) (TimeSeriesList);
