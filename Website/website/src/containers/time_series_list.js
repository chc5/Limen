import React, { Component } from 'react';
import { connect } from 'react-redux';

class TimeSeriesList extends Component {
  getSymbol(timeSeries){
    return timeSeries['symbol'];
  }
  render(){
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Stock</th>
              <th></th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {this.props.timeSeries}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ timeSeries }) {
  return { timeSeries };
}

export default connect(null, mapStateToProps)(TimeSeriesList);
