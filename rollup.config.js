import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/SimpleFS.mjs',
    format: 'esm'
  },
  plugins: [resolve()]
};
