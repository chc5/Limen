import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GRAPH_TYPES } from '../containers/graph_type_selection_bar';
export const SUMMARY = "summary";
const RISK_SCORE = "risk_score";
const COEFFICIENTS = "coefficients";
class Summary extends Component{

  constructor(props){
    super(props);
    this.getName = this.getName.bind(this);
  }

  getName(keyName){
    const result = Object.keys(GRAPH_TYPES).filter(key => {
      return GRAPH_TYPES[key].key === keyName;
    });
    return result.length > 0 ? GRAPH_TYPES[result[0]].name : "undefined";
  }

  render(){
    const timeSeries = this.props.timeSeriesList[this.props.timeSeriesName];
    return (
      <div>
        { this.props.selectedGraphTypes.map(type => {
            return(
              <div key={type}>
                <div key={RISK_SCORE}>{this.getName(type)} Risk Score: {timeSeries[type][SUMMARY][RISK_SCORE]}</div>
                <div key={COEFFICIENTS}>
                  {this.getName(type)} Trendline: {timeSeries[type][SUMMARY][COEFFICIENTS].map(coef =>
                      <span key={coef}> {coef} </span>
                    )}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

}

function mapStateToProps({ selectedGraphTypes, timeSeriesList }, { timeSeriesName }){
  return { selectedGraphTypes, timeSeriesList, timeSeriesName };
}

export default connect(mapStateToProps) (Summary);
