import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectTimeSeries } from '../actions/index';

const DAILY = { name:"Daily Time Series", key:"TIME_SERIES_DAILY_ADJUSTED" };;
const WEEKLY = { name:"Weekly Time Series", key:"TIME_SERIES_WEEKLY_ADJUSTED" };
const MONTHLY = { name:"Monthly Time Series", key:"TIME_SERIES_MONTHLY_ADJUSTED" };

export const TIME_SERIES = {DAILY, WEEKLY, MONTHLY};

class TimeSeriesButtonGroup extends Component{

  constructor(props){
    super(props);
    this.renderBtn = this.renderBtn.bind(this);
    this.props.selectTimeSeries(WEEKLY.key);
  }

  onClick(timeSeries, event){
    this.props.selectTimeSeries(timeSeries);
  }

  renderBtn(timeSeriesName){
    return(
      <button className= {"btn btn-light time-series-btn col "
                            +( this.props.selectedTimeSeries === TIME_SERIES[timeSeriesName].key
                                ? "graph_type_item_checked"
                                : ""
                             )
                          }
              onClick={this.onClick.bind(this, TIME_SERIES[timeSeriesName].key)}
              key={timeSeriesName}
              >
                {TIME_SERIES[timeSeriesName].name}
      </button>
    );
  }

  render(){
    return(
      <div className="row time-series-bar" role="toolbar">
        {Object.keys(TIME_SERIES).map(name => this.renderBtn(name))}
      </div>
    );
  }
  
}

function mapStateToProps({ selectedTimeSeries }){
  return { selectedTimeSeries };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectTimeSeries }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (TimeSeriesButtonGroup);
