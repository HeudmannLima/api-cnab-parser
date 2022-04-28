module.exports = {
  collectCoverageFrom: [
    'src/application/repositories/*.ts',
    'src/tests/repositories/in-memory-transactions-repository.ts',
  ],
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ["json", "html"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  moduleNameMapper: {
    // Jest needs to know about module aliasing as it doesn't run after webpack magic
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  passWithNoTests: true
}