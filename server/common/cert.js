/**
 * 用户权限控制
 */
'use strict'
const mongoose = require('mongoose');
const config = require('../config');

const WebStatus = require('./webStatus');


const CertMiddleWare = {
    /**
     * 需要登录
     */
    userRequired:function (req, res, next) {
        if (!req.session || !req.session.user) {
            return res.send(WebStatus.init(-3).toJSON());
        }
        next();
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
    },
    /**
     * 验证用户是否登录
     */
    authUser:function(req, res, next) {
        if (req.session.user) {
            setUser(req.session.user);
        } else {
            let authToken = req.signedCookies[config.certCookieName];
            if (!authToken) {
                return next();
            }
            let auth = authToken.split('$$$$');
            let userId = auth[0];

            UserModel.getUserById(userId).then(user=>{
                setUser(user);
                return null;
            }).catch(err=>{
                return next(err);
            });
        }

        function setUser(user) {
            if (!user) {
                return next();
            }
            user = req.session.user = new UserModel(user);
            RoleModel.findOne({_id:user.roleId}).then(reData =>{
                req.session.userRoleId = reData.roleId;
                next();
            }).catch(err=>{
                console.log(err)
                res.send(WebStatus.init(-8).toJSON());
                // return next(err);
            });

        }
    }
}


module.exports = CertMiddleWare;
