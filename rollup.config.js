import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/SimpleFS.esm.js',
    format: 'esm'
  },
  plugins: [resolve()]
};
