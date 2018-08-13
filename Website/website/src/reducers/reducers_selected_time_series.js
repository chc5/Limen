import { SELECT_TIME_SERIES } from '../actions/index';

export default function(state = null, action){
  switch(action.type){
    case SELECT_TIME_SERIES:
      return action.payload.data;
    default:
      return state;
  }
}
