const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {        
        monedero: './scripts/pages/monedero.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js')
    },
    mode: 'production',
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            name: 'shared'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },   
    externals: {
        'ko': 'ko',
        '@microsoft/signalr': '@microsoft/signalr'
    }
};
