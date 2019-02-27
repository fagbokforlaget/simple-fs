module.exports = {
  presets: [
    '@babel/env',
    '@babel/flow'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  env: {
    mjs: {
      presets: [
        ['@babel/env', { modules: false}],
      ]
    }
  }
}

