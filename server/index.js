

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackDevConfig from '../webpack.config.dev'

import mongokeeper  from './models/mongokeeper'
import apiRouter from './routes/apiRouter'
import config from './config'

let compiler = ''
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(config.certCookieName));

if(process.env.NODE_ENV == 'development'){
    process.env.MONGO_DB_STR = config.devDbUrl;//config.dbConfig;
    compiler = webpack(webpackDevConfig)
    app.use(webpackMiddleware(compiler,{
        hot: true,
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: false

    }))
    app.use(webpackHotMiddleware(compiler))
}
    compiler = webpack(webpackDevConfig)
    app.use(webpackMiddleware(compiler,{
        hot: true,
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: false

    }))
    app.use(webpackHotMiddleware(compiler))
app.use(express.static(path.join(__dirname, '../client')));

mongokeeper.config(config.dbConfig);

app.use('/api',apiRouter);
app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, './index.html'))
})
// app.get('/*' ,(req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'))
// })


app.listen(config.httpPort, () => console.log("You can debug your app with http://" + config.localhost + ':' +config.httpPort ))


