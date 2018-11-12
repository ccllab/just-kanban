const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: '#source-map',
    devServer: {
        // 伺服器跟路徑
        contentBase: './public/',

        // 當 url 找不到指定路徑皆返回指定檔案
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: './views/index.html' },
            ],
        },
        hot: true,
        compress: true,
        inline: true,
        progress: true,
        stats: 'errors-only',
        host: 'localhost',
        port: '8080',
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),           // HMR shows correct file names in console on update.
    ]
});