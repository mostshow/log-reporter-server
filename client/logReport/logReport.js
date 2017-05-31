;(function () {

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
            this ||
                {};
    var ObjProto = Object.prototype;
    var toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    function isType (name){
        return function(obj){
            return toString.call(obj) === '[object ' + name + ']';
        }
    }

    function extend (destination, source, override) {

        if (override === undefined) override = true;
        for (var property in source) {
            if (override || !(property in destination)) {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function bindError(){
        root.onerror = function (msg, src, row, col, error) {

            if (LogReporter.checkIgnoreMsg(msg) || !src) {
                return true;
            }
            var evt = root.event || null;
            setTimeout(function () {

                var data = {};
                // IE11跟IE10以下的浏览器event对象不一样
                data.col = col || (evt && evt.errorCharacter || evt.colno) || 0;
                data.row = row || (evt && evt.errorLine || evt.lineno) || 0;
                data.sourceFile = src;
                data.level =  "ERROR"
                data.type = "SCRIPTERROR"
                if (!!error && !!error.stack) {
                    // 添加堆栈信息，Safari没有error这个参数
                    data.msg = error.stack.toString();
                } else if (!!arguments.callee) {
                    var ext = [];
                    var f = arguments.callee.caller, c = 3;
                    while (f && --c) {
                        ext.push(f.toString());
                        if (f === f.caller) {
                            break;
                        }
                        f = f.caller;
                    };
                    ext = ext.join(',');
                    data.msg = ext || (evt && evt.errorMessage || evt.message) || '';
                }

                evt = null;
                console.log(LogReporter.needReport())
                if (LogReporter.needReport()) LogReporter.send(data);
            });

            return true;
        };

    }

    var LogReporter = {

        clientLogSendCount:0,

        clientLogSendMax:50,

        init : function(config){
            if(typeof config != 'object') return;
            this.config = {
                url: 'http://10.16.8.5:3006/api/report/log',
                sampling: 1,
                env: 'pro',
                ignore: [],
                debug: true
            };
            extend(this.config,config)
            if(!this.config.debug){
                bindError()
            }
        },

        info : function(data){
            if(typeof data != 'object') return;
            data.level = "INFO"
            this.send(data)
        },

        error : function(data){
            if(typeof data != 'object') return;
            data.level = "ERROR"
            this.send(data)
        },

        warn: function(data){
            if(typeof data != 'object') return;
            data.level = "WARN"
            this.send(data)
        },

        log: function(data){
            if(typeof data != 'object') return;
            data.level = "LOG"
            this.send(data)
        },

        send : function(data){

            var ctx = this;

            if(typeof data != 'object') return;
            if(this.clientLogSendCount > this.clientLogSendMax) return;
            if(this.config.debug) return;

            if (!data.type) data.type = "NONE";
            if (!data.level) data.level = "ERROR";
            if (!data.msg) data.msg = "undefined";

            this.httpClient({
                url: ctx.config.url,
                data: ctx.fixParams(data),
                onDone: function(){
                    console.log('send done!')
                }
            });

            this.clientLogSendCount++;
        },

        checkIgnoreMsg : function(msg){
            for (var i = 0, len = this.config.ignore.length; i < len; i++) {
                if (config.ignore[i].test(msg)) return true;
            }
            return false;
        },

        httpClient : function(obj){
            var img = new Image();
            img.onload = img.onerror = function(data){
                obj.onDone(data);
            };
            img.src = obj.url+"?"+this.concatParams(obj.data);
        },

        fixParams : function(params) {
            var ctx = this;
            var temp = {
                referer : root.location.href,
                env : ctx.config.env,
                resolution : root.screen.width + '*' + root.screen.height,
                from : root.document.referrer || 'NONE'
            }

            return extend(params,temp);
        },

        concatParams : function(obj) {
            var arr = [];
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key) && obj[key]) arr.push(encodeURIComponent(key ) + '=' + encodeURIComponent(obj[key]));
            }
            arr.push("_t=" + (+new Date))

            return arr.join('&');
        },

        needReport : function(){
            return Math.random() < this.config.sampling;
        }
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = LogReporter;
        }
        exports.LogReporter = LogReporter;

    } else {

        root.LogReporter = LogReporter;
    }
    root.LogReporter = LogReporter;

})();




