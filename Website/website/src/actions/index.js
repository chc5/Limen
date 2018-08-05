import axios from 'axios';
// const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
// const API_KEY = 'L2Q64VHCLH2NMMN3'

const ROOT_URL = 'http://localhost:8000';
export const FETCH_TIME_SERIES = 'FETCH_TIME_SERIES';
export const UPDATE_GRAPH = 'UPDATE_GRAPH';
export function fetchTimeSeries(symbol){
  const url = `${ROOT_URL}/get?symbol=${symbol}`;
  const request = axios.get(url);
  return {
    type: FETCH_TIME_SERIES,
    payload: request
  };
}

export function updateGraph(graphType){
  console.log("Sending to reducer",graphType);
  return {
    type: UPDATE_GRAPH,
    payload: {data: graphType}
  }
}
