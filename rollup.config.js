export default {
  input: 'src/index.js',
  output: {
    file: 'dist/SimpleFS.esm.js',
    format: 'es',
  },
  external: [ 'dexie' ]
};
