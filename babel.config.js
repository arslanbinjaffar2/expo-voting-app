module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
          root: ['./'],
          alias: {
            "@src/*": "./src/*",
            '@api': './src/api',
            '@assets': './src/assets',
            '@img':'./src/assets/img',
            '@components': './src/components',
            '@application':'./src/application',
            '@scenes': './src/scenes',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@navigation':'./src/navigation',
            '@screens':'./src/screens',
            '@redux':'./src/application/redux'
          },
        },
      ],
    ],
  };
};
