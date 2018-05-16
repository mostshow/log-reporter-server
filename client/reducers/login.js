
import { LOGIN } from '../actions/types';

const initialState = {
    data:{}
}

export default (state = initialState, action = {}) => {
  switch(action.type) {


    case LOGIN :
        return {
            data: action.loginData,
        }

    default: return state;
  }
}

