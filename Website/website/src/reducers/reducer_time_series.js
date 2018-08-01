import { FETCH_TIME_SERIES } from '../actions/index';

export default function(state = [], action){
  switch (action.type){
    case FETCH_TIME_SERIES:
      console.log(action);
      return [ action.payload.data, ...state ];
    default:
      return state;
  }
}
