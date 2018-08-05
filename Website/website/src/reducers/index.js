import { combineReducers } from 'redux';
import TimeSeriesReducer from './reducers_time_series';
import GraphTypesReducer from './reducers_graph';
const rootReducer = combineReducers({
  timeSeriesList: TimeSeriesReducer,
  selectedGraphTypes: GraphTypesReducer
});

export default rootReducer;
