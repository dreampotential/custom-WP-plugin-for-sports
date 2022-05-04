import { combineReducers } from 'redux';
import uiReducer from './ui_reducers';
import teamReducer from './team_reducers';
const rootReducer = combineReducers({
  ui: uiReducer,
  team: teamReducer,
});

export default rootReducer;
