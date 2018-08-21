import axios from 'axios';

const ROOT_URL = 'https://limen.herokuapp.com';

export const FETCH_TIME_SERIES = 'FETCH_TIME_SERIES';
export const UPDATE_GRAPH = 'UPDATE_GRAPH';
export const SELECT_TIME_SERIES = 'SELECT_TIME_SERIES';

export const SET_DISPLAY = 'SET_DISPLAY';

export const MAIN = 'Main';
export const LOADING = 'Loading';
export const RESULT = 'Result';

export const DISPLAYS = [MAIN, LOADING, RESULT];

export function fetchTimeSeries(symbol){
  const url = `${ROOT_URL}/get?symbol=${symbol}`;
  const request = axios.get(url);
  return {
    type: FETCH_TIME_SERIES,
    payload: request
  };
}

export function updateGraph(graphType){
  return {
    type: UPDATE_GRAPH,
    payload: {data: graphType}
  }
}

export function selectTimeSeries(timeSeriesType){
  return {
    type: SELECT_TIME_SERIES,
    payload: {data: timeSeriesType}
  }
}

export function setDisplay(display){
  return {
    type: SET_DISPLAY,
    payload: {data: display}
  }
}
