import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/plotly';
import MetaData from './meta_data';
import Summary from './summary';
import TimeSeriesButtonGroup from './time_series_button_group';
import GraphTypeSelectionBar from './graph_type_selection_bar';
import Loading, { SMALL_SIZE, LARGE_SIZE} from '../components/loading';
import { LOADING, ERROR, MAIN } from '../actions/index';

export const META_DATA = "Meta Data";

class TimeSeriesList extends Component{

  constructor(props){
    super(props);
    this.renderTimeSeries = this.renderTimeSeries.bind(this);
  }

  renderTimeSeries(timeSeriesName){
    return (
      <div key={timeSeriesName} className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <GraphTypeSelectionBar className="" />
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <Plotly timeSeriesName={timeSeriesName} />
          <TimeSeriesButtonGroup className="" />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <MetaData timeSeriesName={timeSeriesName} />
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
        { this.props.display === ERROR
          ? (
              <div>
                <h4>Error has occurred. I apologize for your inconvenience.</h4>
                <h4>Please enter the correct ticker symbol. Thank you!</h4>
              </div>
            )
          : ("")
        }
        { this.props.display === MAIN
          ? (
              <div className="jumbotron">
                <h1 className="display-4">Limen</h1>
                <p className="lead">
                  An online stock prices analysis website <br />
                  By Chieh-Huang Chen
                </p>
                <hr className="my-4" />
                <p>This site uses machine learning to analyze trends in stock prices.</p>
                <div className="lead">
                  <div>
                    The following libraries/frameworks have been used to create this website:
                  </div>
                  <ul>
                    <li>React.js / Redux</li>
                    <li>Django</li>
                    <li>scikit-learn</li>
                    <li>Plotly.js</li>
                    <li>Bootstrap</li>
                  </ul>
                </div>
              </div>
            )
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
