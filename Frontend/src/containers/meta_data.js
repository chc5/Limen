import React, { Component } from 'react';
import { connect } from 'react-redux';

export const META_DATA = "Meta Data";

const INFORMATION = "1. Information";
const SYMBOL = "2. Symbol";
const LAST_UPDATE = "3. Last Refreshed";
const TIME_ZONE = "4. Time Zone";

class MetaData extends Component{

  constructor(props){
    super(props);
    this.getMetaData = this.getMetaData.bind(this);
  }

  getMetaData(){
    return this.props.timeSeriesList[this.props.timeSeriesName][META_DATA];
  }

  render(){
    const metaData = this.getMetaData();
    return(
      <div className="card text-white bg-dark mb-3" key={META_DATA}>
        <div className="card-body">
          <h5 className="card-title">{metaData[SYMBOL].toUpperCase()}</h5>
          <p className="card-text">
            Last Update: {metaData[LAST_UPDATE]}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedTimeSeries, timeSeriesList }, { timeSeriesName }){
  return { selectedTimeSeries, timeSeriesList, timeSeriesName };
}

export default connect(mapStateToProps) (MetaData);
