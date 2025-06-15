const { resolve } = require("path");
const tomlWebpackPlugin = require("./toml-webpack-plugin/index.cjs");

module.exports = {
    mode: "development",
    entry: resolve(__dirname, "src/index.cjs"),
    output: {
        path: resolve(__dirname, "bin"),
        filename: "bundle.js"
    },
    plugins: [new tomlWebpackPlugin({
        "option1": "hi"
    })]
};