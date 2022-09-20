module.exports = {
    "stories": [
        "../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../hooks/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-scss",
        'storybook-addon-mock/register'
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-webpack5"
    }
}
