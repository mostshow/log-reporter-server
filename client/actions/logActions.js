

import axios from 'axios';

import { GETLOG } from './types';

export function logRequest(logData) {
    return dispatch => {
        return axios.get('/api/report/getlog', {
            params:logData
        }).then(res => {

            if (res.status == 200 && res.data) {
                const logList = res.data.result;
                dispatch({
                    type:GETLOG,
                    logList
                });
            } else {
                console.error(res);
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
