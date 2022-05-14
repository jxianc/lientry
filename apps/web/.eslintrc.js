module.exports = {
  ...require('@li/config/eslint-next'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  root: true,
}
