import { DISPLAYS, MAIN, SET_DISPLAY, FETCH_TIME_SERIES, RESULT, ERROR } from '../actions/index';

const ERROR_KEY = "error"

export default function(state = MAIN, action){
  switch(action.type){
    case SET_DISPLAY:
      const display = action.payload.data;
      return DISPLAYS.includes(display) ? display : MAIN;
    case FETCH_TIME_SERIES:
      if (ERROR_KEY in action.payload.data){
        return ERROR;
      }
      return RESULT;
    default:
      return state;
  }
}
