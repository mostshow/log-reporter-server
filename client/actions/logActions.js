

import axios from 'axios';

import { GETLOG, LOGIN } from './types';

export function logRequest(logData) {
    return dispatch => {
        return axios.get('/api/report/getlog', {
            params:logData
        }).then(res => {

            if (res.status == 200 && res.data) {
                const data = res.data;
                if(data.code == 0){
                    const logList = data.result;
                    dispatch({
                        type:GETLOG,
                        logList
                    });
                }else{
                    alert(data.msg)
                }

            } else {
                alert('api error!!!')
            }

        });
    }
}

export function loginRequest(logData) {
    return dispatch => {
        return axios.post('/api/report/login', logData).then(res => {

            if (res.status == 200 && res.data) {
                const loginData = res.data;
                if(loginData.code == 0){
                    localStorage.setItem('userName', loginData.result.userName);
                }else{
                    alert(loginData.msg)
                    localStorage.removeItem('userName')
                }

            } else {
                alert('api error!!!')
            }

        });
    }
}


export function parseSourceMap(logData) {
    return dispatch => {
        return axios.get('/api/report/getSourceMap', {
            params:logData
        })
    }
}
