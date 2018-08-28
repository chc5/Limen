import { FETCH_TIME_SERIES } from '../actions/index';
const ERROR_KEY = "error"

export default function(state = null, action){
  switch(action.type){
    case FETCH_TIME_SERIES:
      if (ERROR_KEY in action.payload.data){
        return state;
      }
      return action.payload.data["data"];
    default:
      return state;
  }
}
