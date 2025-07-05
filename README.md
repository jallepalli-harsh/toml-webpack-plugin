toml-webpack
============

A simple Webpack plugin to inject TOML configuration files as environment variables at build time.

## Features

- Loads variables from a TOML file (e.g., `.env.toml`).
- Optionally flattens nested TOML objects into single-level environment variables.
- Injects variables as `process.env.*` using Webpack's `DefinePlugin`.

## Installation

```bash
npm install --save-dev toml-webpack-plugin toml
```

## Usage

1. **Add a `.env.toml` file to your project root:**

```toml
title = "Test"

[details]
name = "John"
age = 22
```

2. **Configure the plugin in your `webpack.config.cjs`:**

```js
const { resolve } = require("path");
const TomlWebpackPlugin = require("./toml-webpack-plugin/index.cjs");

module.exports = {
    mode: "development",
    entry: resolve(__dirname, "src/index.cjs"),
    output: {
        path: resolve(__dirname, "bin"),
        filename: "bundle.js"
    },
    plugins: [
        new TomlWebpackPlugin({
            configPath: ".env.toml", // Path to your TOML file
            flatten: false,           // Set to true to flatten nested objects
        })
    ]
};
```

3. **Access your variables in your code:**

```js
console.log(process.env.TITLE); // "Test"
console.log(process.env.DETAILS); // { name: "John", age: 22 } (if flatten: false)
// or
console.log(process.env.DETAILS_NAME); // "John" (if flatten: true)
```

## Options

- `configPath` (string): Path to the TOML file; Default: `.env.toml`
- `flatten` (boolean): Flatten nested TOML objects; Default: `false`

## License

ISC
