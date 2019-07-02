const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { name } = require('./package.json');

const isDev = process.env.NODE_ENV !== 'production';

const NODE_PORT = process.env.NODE_PORT || 3001;
const API_URL = process.env.API_URL || 'http://localhost:3001';
const DIST_PATH = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const config = {
    entry: { main: './app/index.js' },
    output: {
        path: DIST_PATH,
        publicPath: PUBLIC_PATH,
        filename: `${name}.[chunkhash].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true, config: { path: path.resolve(__dirname, 'postcss.config.js') } } },
                ],
            },
            {
                test: /\.(eot|png|svg|ttf|otf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new WebpackMd5Hash(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: `${name}.[contenthash].css`,
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: 'index.html',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),
        new webpack.DefinePlugin({
            PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        contentBase: DIST_PATH,
        publicPath: PUBLIC_PATH,
        compress: true,
        open: true,
        port: NODE_PORT,
        historyApiFallback: {
            index: `${PUBLIC_PATH}/index.html`,
        },
        proxy: {
            '/api': {
                target: `${API_URL}`,
                changeOrigin: true,
                secure: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        alias: {
            actions: path.resolve(__dirname, 'app/actions'),
            reducers: path.resolve(__dirname, 'app/reducers'),
            containers: path.resolve(__dirname, 'app/containers'),
            components: path.resolve(__dirname, 'app/components'),
            services: path.resolve(__dirname, 'app/services'),
            helpers: path.resolve(__dirname, 'app/helpers'),
            mocks: path.resolve(__dirname, 'app/mocks'),
            hoc: path.resolve(__dirname, 'app/hoc'),
            root: path.resolve(__dirname, 'app'),
        },
    },
};

if (isDev) {
    config.devtool = 'eval-source-map';
}

module.exports = config;
