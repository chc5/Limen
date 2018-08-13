import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const DAILY = { name:"Daily Time Series", key:"TIME_SERIES_DAILY_ADJUSTED" };;
const WEEKLY = { name:"Weekly Time Series", key:"TIME_SERIES_WEEKLY_ADJUSTED" };
const MONTHLY = { name:"Monthly Time Series", key:"TIME_SERIES_MONTHLY_ADJUSTED" };

export const TIME_SERIES = {DAILY, WEEKLY, MONTHLY};

export default class TimeSeriesButtonGroup extends Component{

  render(){
    return(
      <div>
        <div className="row" role="toolbar">
          <button className="btn btn-light time-series-btn col">{DAILY.name}</button>
          <button className="btn btn-light time-series-btn col" active>{WEEKLY.name}</button>
          <button className="btn btn-light time-series-btn col">{MONTHLY.name}</button>
        </div>
      </div>
    );
  }
}

// export default connect(null, null) (TimeSeriesButtonGroup);
