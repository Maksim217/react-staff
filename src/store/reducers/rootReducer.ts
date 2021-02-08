import { combineReducers } from 'redux';
import { staffReducer } from '../reducers/staff';

export const rootReducer = combineReducers({
  staff: staffReducer,
});
