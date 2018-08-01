import axios from 'axios';
// const SYMBOL = 'symbol';
// const ROOT_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
// const API_KEY = 'L2Q64VHCLH2NMMN3'

// const FUNCTION = 'function';
const ROOT_URL = 'http://localhost:8000';
export const FETCH_TIME_SERIES = 'FETCH_TIME_SERIES';

export function fetchTimeSeries(symbol){
  const url = `${ROOT_URL}/get?symbol=${symbol}`;
  const request = axios.get(url);
  return {
    type: FETCH_TIME_SERIES,
    payload: request
  };
}
