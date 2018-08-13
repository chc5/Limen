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

export const GRAPH_TYPES = { ADJUSTED_CLOSE, OPEN, HIGH, LOW, CLOSE, VOLUME, DIVIDEND };

class GraphTypeSelectionBar extends Component {
  constructor(props){
    super(props);
    this.renderCol = this.renderCol.bind(this);
    this.props.updateGraph(ADJUSTED_CLOSE.key);
  }
  onClick(type, event){
    this.props.updateGraph(type);
  }
  renderCol(type){
    let colClassName = "selection_bar_items col "
          + (this.props.selectedGraphTypes.includes(GRAPH_TYPES[type].key)? "graph_type_item_checked" : "");

    return (
      <div className={colClassName}
           key={GRAPH_TYPES[type].key}
           onClick={this.onClick.bind(this, GRAPH_TYPES[type].key)}>
        {GRAPH_TYPES[type].name}
      </div>
    );
  }

  render(){
    return(
      <div className="selection_bar row">
        { Object.keys(GRAPH_TYPES).map(this.renderCol) }
      </div>
    );
  }
}

function mapStateToProps({ selectedGraphTypes }){
  return { selectedGraphTypes };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateGraph }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(GraphTypeSelectionBar);
