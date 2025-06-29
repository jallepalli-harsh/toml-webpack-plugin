const fs = require("fs");
const toml = require("toml");

module.exports = class TomlWebpackPlugin {
    constructor(options) {
        this.configPath = options.configPath ?? ".env.toml";
        this.flatten = options.flatten ?? false;
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapAsync("TomlWebpackPlugin", (_, callback) => {
            let envData = {};
            if (fs.existsSync(this.configPath)) {
                const file = fs.readFileSync(this.configPath, "utf8");
                envData = { ...envData, ...toml.parse(file) };
            } else {
                console.log("Provided path is invalid!");
                return;
            }

            const webpack = require("webpack");
            const define = {};
            if (this.flatten) envData = flattenTOML(envData);
            Object.entries(envData).forEach(([key, value]) => {
                define[`process.env.${key.toLocaleUpperCase()}`] = value
            });
            console.log(define);
            new webpack.DefinePlugin(define).apply(compiler);
            callback();
        })
    }
};

function flattenTOML(data, parentKey = "", result = {}) {
    for (const [key, value] of Object.entries(data)) {
        const newKey = parentKey ? `${parentKey}_${key}` : key;
        if (typeof value === "object" && !Array.isArray(value) && value != null) flattenTOML(value, newKey, result);
        else result[newKey] = value;
    }

    return result;
}

