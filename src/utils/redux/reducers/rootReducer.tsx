import {combineReducers} from 'redux';
import todoSlice from './todoSlice';

export default combineReducers({todoReducer: todoSlice}); // Add more reducers
