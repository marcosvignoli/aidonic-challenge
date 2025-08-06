module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@aidonic/shared-types$": "<rootDir>/../shared-types/src/index.ts",
    "^@aidonic/shared-utils$": "<rootDir>/../shared-utils/src/index.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.d.ts"],
};
