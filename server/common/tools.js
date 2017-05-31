
'use strict'
import moment from 'moment'
import _ from 'lodash'
import util from 'util'
import fs from 'fs'

import config from '../config'
import WebStatus from './webStatus'

const consolePrint = config.debug ;

moment.locale('zh-cn');

if (!fs.existsSync("./log")) {
    fs.mkdirSync("./log");
}
export default {

    getParam (req, fieldName){
        let fieldValue = req.body[fieldName] || req.query[fieldName];
        return _.trim(fieldValue);
    },

    notEmpty (){
        if (data.some(function(item) {return _.trim(item) === '';})) {
            return true;
        }
        return false;
    },
    sendResult (res,statusCode,data) {
        WebStatus.init(statusCode);
        if (data) {
            WebStatus.setResult(data)
        }
        res.send(WebStatus.toJSON())
    },

    logger:function(infos,level = 'info') {
        let filePrint = level !== 'debug';
        let date = moment(date);
        let prefix = '**';
        let logStr = ''

        if(_.isObject(infos)){
            logStr = JSON.stringify(infos);
        }else{
            logStr = infos
        }
        let line =  util.format('[%s]:%s%s',level,prefix,logStr);
        if (filePrint)
            fs.appendFile('./log/log-' + date.format('YYYY-MM-DD')+ '.log', line + "\n");
        if (consolePrint)
            console.log(line);
    },


    reObj (origin,param){
        let temp = {}
        _.each(param,function(n){
            if (Object.hasOwnProperty.call(origin,n)) {
                temp[n] = origin[n];
            }
        })
        return temp;
    },

    htmlEncode (str) {
        var s = '';
        if (str == null || typeof(str) == 'undefined' || str.length == 0) return '';
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "'");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },

    getPlatform(userAgent){
        var platform = '';
        var ua = userAgent;
        if(/MicroMessenger/i.test(ua)){
            platform = '微信浏览器';//这是微信平台下浏览器
        }else if(/android|adr/i.test(ua)){

            // 根据不同产品线，分为GT-，SM-，SCH-开头的UA来判断是三星
            if(/GT-|SM-|SCH-/ig.test(ua)) {
                platform = '三星系列'
            } else if (/HM|RedMi|Mi/ig.test(ua)) { // 可能会有遗漏
                platform = '小米手机'
            } else if (/huawei|honor/ig.test(ua)) { //huawei的是华为，honor的是华为荣耀
                platform = '华为手机'
            } else if(/vivo/ig.test(ua)) {
                platform = 'vivo手机'
            } else {
                platform = 'android';
            }
        } else if(/(iPhone|iPad|iPod|iOS)/i.test(ua)){
            platform = 'ios';//这是iOS平台下浏览器
        } else if(!!ua.match(/AppleWebKit.*Mobile.*/)){
            platform = '移动终端';// 移动终端
        } else if(ua.indexOf('AppleWebKit')){
            platform = '苹果，谷歌内核';
        } else if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            platform = 'ios终端'
        } else {
            platform = 'other';
        }
        return platform;
    }
}

