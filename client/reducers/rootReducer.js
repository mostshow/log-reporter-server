
import { combineReducers } from 'redux';
import logList from './log'
import login from './login'

export default combineReducers({
    logList,
    login
});
