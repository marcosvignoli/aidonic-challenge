module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@aidonic/shared-types$": "<rootDir>/../shared-types/src/index.ts",
  },
  setupFilesAfterEnv: [],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
};
