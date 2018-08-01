import { combineReducers } from 'redux';
import TimeSeriesReducer from './reducer_time_series';

const rootReducer = combineReducers({
  timeSeries: TimeSeriesReducer
});

export default rootReducer;
