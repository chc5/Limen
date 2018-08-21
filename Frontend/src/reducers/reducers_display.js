import { DISPLAYS, MAIN, SET_DISPLAY, FETCH_TIME_SERIES, RESULT } from '../actions/index';


export default function(state = MAIN, action){
  switch(action.type){
    case SET_DISPLAY:
      const display = action.payload.data;
      return DISPLAYS.includes(display) ? display : MAIN;
    case FETCH_TIME_SERIES:
      return RESULT;
    default:
      return state;
  }
}
