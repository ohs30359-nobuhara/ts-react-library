const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


module.exports = (baseConfig, env, config) => {

  config = genDefaultConfig(baseConfig);

  // scss
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  });

  // ts
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader')
  });
  config.resolve.extensions.push('.tsx','.ts');

  return config;
};
