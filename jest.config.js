module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/server'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};