import { combineReducers } from 'redux';
import TimeSeriesReducer from './reducers_time_series';
import GraphTypesReducer from './reducers_graph';
import selectedTimeSeriesReducer from './reducers_selected_time_series';
const rootReducer = combineReducers({
  timeSeriesList: TimeSeriesReducer,
  selectedGraphTypes: GraphTypesReducer,
  selectedTimeSeries: selectedTimeSeriesReducer
});

export default rootReducer;
