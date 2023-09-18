/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/**.test.ts'],
  verbose: true,
  forceExit: true,
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1'
  }
}

module.exports = config
