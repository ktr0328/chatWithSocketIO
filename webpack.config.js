module.exports = {
    // watchモードを有効にする
    // watch: true,
    entry: "./public/typescripts/entry.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + '/public/dist'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
};
