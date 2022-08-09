const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ],
    devServer: {
        // static: false,
        static: {
        // directory: path.join(__dirname, "dist"),
            directory: __dirname,
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: { injectType: "singletonStyleTag" },
                    },
                    "css-loader",
                ],
            },
        ],
    },
};
