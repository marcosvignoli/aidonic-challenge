// This file is used to set up the test environment
import "@testing-library/jest-dom";

// Global test configuration
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
