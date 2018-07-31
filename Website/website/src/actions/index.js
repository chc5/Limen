export const SYMBOL = 'symbol';
export const ROOT_URL = 'localhost/get?';
export const FUNCTION = 'function';

export function fetchStockData(symbol, function_, ){
  const url = `${ROOT_URL}&${SYMBOL}=${symbol}&${FUNCTION}=${function_}`
  let request = fetch(url);
  return {
    type: SYMBOL,
    payload: request
  };
}
