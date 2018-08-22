import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GRAPH_TYPES } from '../containers/graph_type_selection_bar';
export const SUMMARY = "summary";
const RISK_SCORE = "risk_score";
const COEFFICIENTS = "coefficients";
const POTENTIAL_SCORE = "potential_score";
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
            console.log(timeSeries[type][SUMMARY][COEFFICIENTS]);
            return(
              <div className="card text-white bg-dark mb-3" key={type}>
                <div className="card-header">{this.getName(type)} Summary</div>
                <div className="card-body">
                  <h5 className="card-title">Steady Score: {timeSeries[type][SUMMARY][RISK_SCORE]}</h5>
                  <p className="card-text">
                    This score out of 100 calculates how steady this stock is.
                    The higher the score, the more safe the score.
                  </p>
                  <h5 className="card-title">
                    Potential Growth: {timeSeries[type][SUMMARY][POTENTIAL_SCORE]}
                  </h5>
                  <p className="card-text">
                    This score calculates how much potential this stock has.
                    The higher the score, the more gains you can potentially earn. <br />
                  </p>
                  <h6 className="card-text text-primary">
                    Warning: This is still a speculation in the end of the day.
                  </h6>
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
