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
    'snowpack-plugin-rollup-bundle',
    [
      '@snowpack/plugin-sass',
      {
        compilerOptions: {
          loadPath: './node_modules/normalize-scss/sass',
        },
      },
    ],
  ],
  installOptions: { sourceMaps: true },
  buildOptions: { sourceMaps: true, baseUrl: './_dist_/client' },
  devOptions: { open: 'none', sourceMaps: true, baseUrl: './_dist_/client' },
};
