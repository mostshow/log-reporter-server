
export default {

    httpPort: 3006,
    localhost: '127.0.0.1', //本地部署
    devDbUrl: 'mongodb://127.0.0.1/logReport',
    dbConfig: {
        host: "10.16.15.101",
        database: "logReport",
        userid: "logReport",
        password: "qguanzi",
        port:27017,
    },
    debug: true,
    user:{
        qguanzi:{
            password:'qguanzi2018',
            _id:'fsfwejrdflwejor'
        }
    },
    jwtSecret: 'fsfwejrdflwejor',
    sessionSecret: 'log_secret', // session密匙
    certCookieName: 'log_cookie' //cookie名称
}
