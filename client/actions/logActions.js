

import axios from 'axios';
import { GETLOG, LOGIN } from './types';

export function logRequest(logData) {
    return dispatch => {
        return axios.post('/api/report/getlog', fixDaga(logData)).then(res => {
            if (res.status == 200 && res.data) {
                const data = res.data;
                if(data.code == 0){
                    const logList = data.result;
                    dispatch({
                        type:GETLOG,
                        logList
                    });
                }else if(data.code == -3 || data.code == -4){
                    localStorage.removeItem('token')
                    window.location.href = 'login'
                    alert(data.msg)
                }else{
                    alert('api error!!!')
                }

            } else {
                alert('api error!!!')
            }

        });
    }
}

export function loginRequest(data) {
    return dispatch => {
        return axios.post('/api/report/login', fixDaga(data)).then(res => {
            if (res.status == 200 && res.data) {
                const loginData = res.data;
                if(loginData.code == 0){
                    const token = loginData.result.token;
                    localStorage.setItem('token', token);
                    window.location.href = 'log'
                }else{
                    alert(loginData.msg)
                }

            } else {
                alert('api error!!!')
            }

        });
    }
}


export function parseSourceMap(data) {
    return dispatch => {
        return axios.post('/api/report/getSourceMap', fixDaga(data))
    }
}

function fixDaga(data){
    data.token = localStorage.getItem('token') || '';
    return data
}