import { FETCH_TIME_SERIES } from '../actions/index';

export default function(state = null, action){
  console.log(action);
  switch(action.type){
    case FETCH_TIME_SERIES:
      return action.payload.data["data"];
    default:
      return state;
  }
}
