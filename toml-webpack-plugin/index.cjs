module.exports = class TomlWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log("FROM TOML-WEBPACK PLUGIN");
        console.log("Options: ", this.options);
    }
};