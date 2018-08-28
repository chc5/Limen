import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectTimeSeries } from '../actions/index';

const DAILY = { name:"Daily", key:"TIME_SERIES_DAILY_ADJUSTED", time:"day" };;
const WEEKLY = { name:"Weekly", key:"TIME_SERIES_WEEKLY_ADJUSTED", time:"week" };
const MONTHLY = { name:"Monthly", key:"TIME_SERIES_MONTHLY_ADJUSTED", time:"month" };

export const TIME_SERIES = {DAILY, WEEKLY, MONTHLY};

class TimeSeriesButtonGroup extends Component{

  constructor(props){
    super(props);
    this.renderBtn = this.renderBtn.bind(this);
    // this.props.selectTimeSeries(DAILY.key);
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
      <div className="ml-1 mr-1 row time-series-bar" role="toolbar">
        { this.props.timeSeriesList
          ? Object.keys(TIME_SERIES).map(name => this.renderBtn(name))
          : ""
        }
      </div>
    );
  }

}

function mapStateToProps({ selectedTimeSeries, timeSeriesList }){
  return { selectedTimeSeries, timeSeriesList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectTimeSeries }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (TimeSeriesButtonGroup);
