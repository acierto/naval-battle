import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from './webpack/webpack.config.dev';
import {proxyPort} from '../utils/port';
import hostname from '../utils/hostname';

const target = `http://${hostname}:${proxyPort}`;

const proxy = [{
    changeOrigin: true,
    context: ['/api'],
    target
}];

gulp.task('dev-server', () => {
    return new Promise((resolve) => {
        const webpackInstance = webpack(webpackDevConfig);
        webpackInstance.hooks.done.tap('Dev Server', () => resolve());
        const server = new WebpackDevServer(webpackInstance, {
            disableHostCheck: true,
            historyApiFallback: true,
            hot: true,
            lazy: false,
            noInfo: false,
            proxy,
            publicPath: webpackDevConfig.output.publicPath,
            quiet: false,
            stats: {colors: true}
        });
        server.listen(proxyPort);
    });
});
