import { UPDATE_GRAPH } from '../actions/index';
import { ADJUSTED_CLOSE } from '../containers/graph_type_selection_bar';

export default function(state = [ADJUSTED_CLOSE.key], action){
  switch(action.type){
    case UPDATE_GRAPH:
      const graphType = action.payload.data;
      if(state.includes(graphType)){
        return state.filter(i => i !== graphType);
      }
      else{
        return [...state, graphType]
      }
    default:
      return state;
  }
}
