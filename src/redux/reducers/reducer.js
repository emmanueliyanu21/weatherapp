import { combineReducers } from 'redux';
import noteReducer from './note.reducer';
import weatherReducer from './weather.reducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  weather: weatherReducer,
});

export default rootReducer;