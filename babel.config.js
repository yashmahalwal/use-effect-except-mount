// babel.config.js

module.exports = {
    presets: [
        "@babel/preset-react",
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
    ],
};
