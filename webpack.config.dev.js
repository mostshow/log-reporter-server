
import path from 'path'
import webpack from 'webpack'

export default{
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/index.js')
    ],
    output: {
        path : '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
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
