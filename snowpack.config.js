// const webpackConfig = require('./webpack.config.js');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  exclude: [
    '**/src/server/**/*',
    '**/node_modules/**/*',
    '**/__tests__/*',
    '**/*.@(spec|test).@(js|mjs)',
  ],
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    ['@snowpack/plugin-sass', {}],
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          config.module.rules[0].use[0].options.presets[0][1].targets =
            config.module.rules[0].use[0].options.presets[0][1].targets.production;
          config.module.rules[0].use[0].options.plugins = [
            '@babel/plugin-proposal-class-properties',
          ];
          config.plugins.push(
            new RemovePlugin({
              after: {
                root: './build',
                include: ['__snowpack__', '_dist_', 'web_modules'],
              },
            })
          );
          return config;
        },
      },
    ],
  ],
  devOptions: { open: 'none', sourceMaps: true, baseUrl: './_dist_/client' },
};
