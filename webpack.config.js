const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
    const isProd = process.env.MODE === 'prod';
    return {
        mode: isProd ? 'production' : 'development',
        entry: path.resolve(__dirname, 'src', 'main.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader',],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'public', 'index.html')
            }),
            new CleanWebpackPlugin(),
        ],
        devtool: isProd ? 'none' : 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            port: 4444,
            historyApiFallback: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'foundation-dist-css': path.resolve(__dirname, 'node_modules', 'foundation-sites', 'dist', 'css', 'foundation.min.css'),
            },
        },
    }
}