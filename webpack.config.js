const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', // Set to 'production' for production builds
    entry: './src/index.js', // Adjust entry point as needed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chat-widget.js',
        clean: true, // Clean the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match both .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.svg$/,
                type: 'asset/resource', // or use 'file-loader' if using webpack < 5
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html', // Path to your HTML template
        }),
        new MiniCssExtractPlugin({
            filename: 'chat-widget.css',
        }),
    ],
};
