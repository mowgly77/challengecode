/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!lowdb)',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/'],
};
