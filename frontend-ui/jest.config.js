module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/cypress"],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/main.ts",
    "!src/polyfills.ts",
    "!src/environments/**/*.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 25,
      statements: 25,
    },
  },
  moduleNameMapper: {
    "@src/(.*)$": "<rootDir>/src/$1",
    "@tests/(.*)$": "<rootDir>/tests/$1",
  },
};
