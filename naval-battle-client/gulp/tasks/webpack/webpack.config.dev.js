import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from '../../utils/paths';
import {serverPort} from '../../utils/port';
import hostname from '../../utils/hostname';
import common from './webpack.config.common';

export default {
    devServer: {
        contentBase: '/devDist/',
        hot: true,
        port: serverPort,
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    entry: {
        main: [
            `webpack-dev-server/client?http://${hostname}:${serverPort}`,
            'webpack/hot/only-dev-server',
            './src/app'
        ]
    },
    mode: 'development',
    module: {
        rules: common.rulesConfig
    },
    node: {module: 'empty'},
    optimization: {
        noEmitOnErrors: true
    },
    output: {
        filename: '[name]-[hash].js',
        path: paths.devDistDir,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/app.ejs',
            title: 'Naval Battle'
        }),
        ...common.plugins
    ],
    resolve: common.resolve
};
