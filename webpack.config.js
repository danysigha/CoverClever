const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        popup: './src/popup.js',
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/manifest.json", to: "manifest.json" },
                { from: "src/assets", to: "assets" },
                { from: "src/background.js", to: "background.js" }
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
};
