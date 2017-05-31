
import { GETLOG } from '../actions/types';

const initialState = {
    data:[],
    total:0
}

export default (state = initialState, action = {}) => {
  switch(action.type) {


    case GETLOG :
        return {
            data: [...action.logList.data],
            total:action.logList.total
        }

    default: return state;
  }
}

