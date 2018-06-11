const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
    entry: './src/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react', 'env', 'stage-1']
                        },
                    },
                ],
            },
        ]
    }
};

module.exports = webpackConfig;