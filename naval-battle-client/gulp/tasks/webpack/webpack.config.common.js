import LessHintPlugin from 'lesshint-webpack-plugin';
import paths from '../../utils/paths';

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        config: {path: 'postcss.config.js'},
        sourceMap: 'inline'
    }
};

export default {
    plugins: [
        new LessHintPlugin({files: [`${paths.srcDir}/**/*.less`]})
    ],
    rulesConfig: [
        {
            enforce: 'pre',
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'tslint-loader'
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        },
        {test: /\.css$/, use: ['style-loader', 'css-loader', postCssLoader]},
        {
            test: /\.(jpe?g|png|gif|svg|ico)\??.*$/i,
            use: [
                'file-loader?hash=sha512&digest=hex&name=assets/[name]-[hash].[ext]',
                {
                    loader: 'image-webpack-loader?bypassOnDebug',
                    options: {
                        gifsicle: {interlaced: false},
                        optipng: {optimizationLevel: 7}
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        localsConvention: 'camelCase',
                        modules: {
                            localIdentName: '[name]__[local]',
                            mode: 'local'
                        }
                    }
                }, postCssLoader, 'less-loader?sourceMap']
        },
        {loader: 'url-loader', test: /\.(svg|woff|woff2|eot|ttf|otf)/}
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.less']
    }
};
