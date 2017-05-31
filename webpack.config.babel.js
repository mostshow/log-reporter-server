
import path from 'path'
import webpack from 'webpack'

export default{
    entry: {
        bundle:path.join(__dirname, '/client/index.js'),
        logReport:path.join(__dirname, '/client/logReport/logReport.js')
    },
    output: {
        path: path.join(__dirname, '/client/dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders:[
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client')
                ] ,
                loaders: [  'babel-loader' ]
            },
            {
                test: /\.css$/,
                include: [
                    path.join(__dirname, 'client/css')
                ] ,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    },
    resolve: {
        extensions: ['.js' ]
    }

};

