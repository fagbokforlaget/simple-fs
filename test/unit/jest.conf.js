const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: [
    'js',
    'json'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true
}
