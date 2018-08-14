import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GRAPH_TYPES } from '../containers/graph_type_selection_bar';
export const SUMMARY = "summary";

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
              <div className="col">
                <div>{this.getName(type)} Risk Score: {timeSeries[type][SUMMARY]['risk_score']}</div>
                <div>
                  {this.getName(type)} Trendline: {timeSeries[type][SUMMARY]['coefficients'].map(coef =>
                      <span> {coef} </span>
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
