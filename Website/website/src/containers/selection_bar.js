import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateGraph } from '../actions/index';

export const OPEN = { name:"Opening Price", key:"1. open" };
export const HIGH = { name:"Highest Price", key:"2. high" };
export const LOW = { name:"Lowest Price", key:"3. low" };
export const CLOSE = { name:"Closing Price", key:"4. close" };
export const ADJUSTED_CLOSE = { name:"Adjusted Closing Price", key:"5. adjusted close" };
export const VOLUME = { name:"Volume", key:"6. volume" };
export const DIVIDEND = { name:"Dividend", key:"7. dividend amount" };
export const SPLIT_COEFFICIENT = { name:"Split Coefficent", key:"8. split coefficient" };

export const GRAPH_TYPES = { OPEN, HIGH, LOW, CLOSE, ADJUSTED_CLOSE, VOLUME, DIVIDEND, SPLIT_COEFFICIENT };

class SelectionBar extends Component {
  constructor(props){
    super(props);
    this.renderCol = this.renderCol.bind(this);
    this.props.updateGraph(ADJUSTED_CLOSE.key);
  }
  onClick(type, event){
    this.props.updateGraph(type);
  }
  renderCol(type){
    return (
      <div className="col"
           key={GRAPH_TYPES[type].key}
           onClick={this.onClick.bind(this, GRAPH_TYPES[type].key)}>
        {GRAPH_TYPES[type].name}
      </div>
    );
  }

  render(){
    return(
      <div className="row">
        { Object.keys(GRAPH_TYPES).map(this.renderCol) }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateGraph }, dispatch);
}


export default connect(null, mapDispatchToProps)(SelectionBar);
