module.exports = {
  ...require('@li/config/eslint-nest'),
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  root: true,
};
