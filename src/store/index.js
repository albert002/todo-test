import { createStore, combineReducers } from 'redux';
import listItems from './modules/listItems';

const rootReducer = combineReducers({
  listItems,
});

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
);
