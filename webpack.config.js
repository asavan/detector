const path = require("path");
const os = require('os');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const {InjectManifest} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// process.traceDeprecation = true;

const getLocalExternalIP = () => [].concat(...Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address

module.exports = (env, argv) => {
    const devMode = !argv || (argv.mode !== 'production');
    let addr = getLocalExternalIP() || '0.0.0.0';
    return {

        entry: {main: "./src/index.js"},
        output: {
            path: path.resolve(__dirname, "docs"),
            filename: devMode ? "[name].js" : "[name].[contenthash].min.js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader'],
                }
            ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                },
                extractComments: false
            }), new CssMinimizerPlugin()],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
                inject: 'head'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].min.css'
            }),
            ...(devMode ? [] : [new InjectManifest({
                swDest: './sw.js',
                swSrc: './src/sw.js',
                maximumFileSizeToCacheInBytes: 5000000,
                exclude: [
                    /index\.html$/,
                    /CNAME$/,
                    /\.nojekyll$/,
                    /_config\.yml$/,
                    /^.*well-known\/.*$/,
                ]
            })]),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: !devMode
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'src/images', to: './images' },
                    { from: 'models/', to: './models' },
                    { from: 'temp', to: './models' },
                    { from: 'src/manifest.json', to: './' },
                    { from: 'github', to: './' }
                ],
            })
        ],
        devServer: {
            // contentBase: path.resolve(__dirname, "src"),
            historyApiFallback: true,
            compress: true,
            port: 8080,
            hot: true,
            open: true,
            // host: addr,
            host: 'localhost',
            // clientLogLevel: 'debug',
            // watchContentBase: true,
        },
        resolve: {
            fallback: { "util": false, "fs": false },
        }
    }
};
