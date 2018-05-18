/**
 * 用户权限控制
 */
'use strict'

import mongoose from 'mongoose'
import config from '../config'
import WebStatus from './webStatus'
import jwt from 'jsonwebtoken'

const CertMiddleWare = {
    /**
     * 需要登录
     */
    userRequired:function (req, res, next) {
        console.log(req.body)
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.jwtSecret , function(err, decoded) {
                if (err) {
                    return res.send(WebStatus.init(-4).toJSON());
                } else {
                    req.api_user = decoded;
                    console.dir(req.api_user);
                    next();
                }
            });
        }else{
            return res.send(WebStatus.init(-3).toJSON());
        }
    },

    /**
     * cookie签名保存
     */
    rootSession:function(user, res, next) {
        let authToken = user._id + '$$$$';
        let opts = {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7 ,
            signed: true, //如果true,express会使用req.secret来完成签名，需要cookie-parser配合使用
            httpOnly: true
        };
        res.cookie(config.certCookieName, authToken, opts);
        next();
    }
}


module.exports = CertMiddleWare;
