
import { combineReducers } from 'redux';

// import reducers
import MarkitData from './MarkitDataReducer'

// combine reducers
const rootReducer = combineReducers({
  markitData: MarkitData
})

export default rootReducer;
