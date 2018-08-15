import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/plotly';
import MetaData from './meta_data';
import Summary from './summary';
import Loading, { SMALL_SIZE, LARGE_SIZE} from '../components/loading';
import { LOADING } from '../actions/index';

export const META_DATA = "Meta Data";

class TimeSeriesList extends Component{

  constructor(props){
    super(props);
    this.renderTimeSeries = this.renderTimeSeries.bind(this);
  }

  renderTimeSeries(timeSeriesName){
    return (
      <div key={timeSeriesName} className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <MetaData timeSeriesName={timeSeriesName} />
          <Plotly timeSeriesName={timeSeriesName} />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <Summary timeSeriesName={timeSeriesName} />
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className='time-series-graph'>
        { this.props.display === LOADING
          ? this.props.timeSeriesList
              ? (<Loading size={LARGE_SIZE}/>)
              : (<Loading size={SMALL_SIZE}/>)
          : ("")
        }
        { this.props.timeSeriesList
          ? (this.renderTimeSeries(this.props.selectedTimeSeries))
          : ("")
        }
      </div>
    );
  }

}

function mapStateToProps({ display, selectedTimeSeries, timeSeriesList }){
  return { display, selectedTimeSeries, timeSeriesList };
}

export default connect (mapStateToProps) (TimeSeriesList);
