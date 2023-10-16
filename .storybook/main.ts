import type { StorybookConfig } from "@storybook/react-webpack5";
import globalWebpackConfig from "../webpack.config.js";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        /*"@storybook/preset-create-react-app"*/
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["..\\public"],
    webpackFinal: async (config, { configType }) => {
        config.resolve.modules = ["node_modules", "src"];
        config.resolve.alias = globalWebpackConfig.resolve.alias;

        config.module.rules.push(
            // babel loader
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-react",
                                {
                                    runtime: "automatic"
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/
            },
        );

        const imageRule = config.module.rules.find(
            (rule) => rule.test && rule.test.test(".svg")
        );
        imageRule.exclude = /\.svg$/;

        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config
    },
};
export default config;
