// This file is used to set up the test environment
import "@testing-library/jest-dom";

// Mock React for tests
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
  useCallback: jest.fn(),
}));
