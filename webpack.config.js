var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "web/bundles");
var CONTAINER_DIR = path.resolve(__dirname, "client/containers");

var config = {
    entry: {
        addNote: CONTAINER_DIR + "/AddNote.js",
        search: CONTAINER_DIR + "/Search.js"
    },
    output: {
        path: BUILD_DIR,
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }
};

module.exports = config;