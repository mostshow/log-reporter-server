
import _ from 'lodash'
import moment from 'moment'
import request from 'request'
import sourceMap from 'source-map'

import LogModel from '../models/log_model'
import tools from '../common/tools'
import config from '../config'

export default {

    log(req, res, next) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let userAgent = tools.getPlatform(req.headers['user-agent'] || '') + ':----' + req.headers['user-agent'];
        let level = req.query.level || 'NONE';

        req.query._t = moment().format('YYYY-MM-DD HH:mm')
        req.query.userAgent = userAgent
        req.query.ip = ip

        tools.logger(req.query,level)

        let msg = req.query.msg || '';
        let col = req.query.col || -1;
        let row = req.query.row || -1;
        let sourceFile = req.query.sourceFile || '';
        let referer = req.query.referer || '' ;
        let resolution = req.query.resolution || '';
        let from = req.query.from || '';
        let type = req.query.type || 'NONE'
        let env = req.query.env

        let _log = {
            ip: ip,
            env: env,
            userAgent:userAgent,
            msg: msg ,
            col: col ,
            row: row ,
            sourceFile: sourceFile,
            level: level,
            referer: referer,
            resolution: resolution ,
            from: from,
            type: type,

        }

        let log = new LogModel(_log);

        log.save(function (error) {
            if (error) {
                console.log(error)
               return  tools.sendResult(res,-1);
            }
            tools.sendResult(res,0);
        });
    },
    getLog(req, res, next) {

            let pageSize = +req.query.pageSize || 10;
            let currentPage = +req.query.curPage ;
            let from = new Date(req.query.startDate).getTime();
            let to = new Date(req.query.endDate).getTime();
            let keyword = req.query.keyword;
            let selectValue = req.query.selectValue;
            var sort = {'createAt': -1};

            var condition = {};
            var fields = {'__v': 0};

            var skipnum = currentPage * pageSize;

            if (from && to) {
                if (from <= to) {
                    condition['createAt'] = {'$gte': from, '$lte': to};
                } else {
                    tools.sendResult(res,-1,{data: [], total: 0});
                    return ;
                }
            }

            if (keyword&&selectValue) {
                condition[selectValue] = new RegExp(keyword.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'i');
            }
            LogModel.find(condition, fields).skip(skipnum).limit(pageSize).sort(sort).exec( (err, data) => {
                if (err) {
                    tools.sendResult(res,-1);
                } else {
                    LogModel.count(condition).exec( (error, result) => {
                        if (error) {
                            tools.sendResult(res,-1);
                        } else {
                            tools.sendResult(res,0,{data: data, total: result});
                        }
                    });
                }
            });
    },
    getSourceMap(req, res){

        let row = +req.query.row || 1;
        let col = +req.query.col || 10;
        let sourceMapSrc = (req.query.sourceMapSrc && decodeURIComponent(req.query.sourceMapSrc)) || 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.map';

        if (row > 0 && col > 0 && sourceMapSrc) {
            request(sourceMapSrc,  (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        JSON.parse(body);
                        let consumer = new sourceMap.SourceMapConsumer(body);
                        let result = consumer.originalPositionFor({ line: row, column: col });

                        tools.sendResult(res,0,result);
                    } catch (e) {

                        tools.sendResult(res,-10);
                    }
                } else {
                    //response.statusCode
                    //response.statusMessage
                    tools.sendResult(res,-11);
                }
            });
        } else {
            tools.sendResult(res,-1);
        }
    }
}

