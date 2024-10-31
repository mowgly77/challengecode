/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest', // Agrega soporte para JSX
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!lowdb)' // Permitir que Jest procese lowdb
    ],
  };
  