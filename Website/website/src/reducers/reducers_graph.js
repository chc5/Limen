import { UPDATE_GRAPH } from '../actions/index';

export default function(state = [], action){
  switch(action.type){
    case UPDATE_GRAPH:
      let graphType = action.payload.data;
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
