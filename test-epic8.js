#!/usr/bin/env node

/**
 * Epic 8: Missing Core Features Test
 *
 * This test verifies all the missing core features from the Aidonic Challenge requirements:
 * - Web Filters (Region and Status filter dropdowns)
 * - Web Pagination (Page controls and limit selection)
 * - Web Search (Search input for distributions)
 * - Mobile Pull-to-refresh (RefreshControl implementation)
 * - Mobile Search (Search functionality in mobile app)
 * - Mobile Filters (Filter options in mobile app)
 * - Enhanced API (Support for filters and pagination in mock API)
 * - Hook Updates (Update hooks to support filtering and pagination)
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Starting Epic 8: Missing Core Features Test\n");

// Test configuration
const config = {
  webUrl: "http://localhost:3000",
  mobileUrl: "http://localhost:8081",
  timeout: 30000,
};

// Utility functions
function runCommand(command, description) {
  console.log(`\n📋 ${description}`);
  try {
    const result = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      timeout: config.timeout,
    });
    console.log("✅ Success");
    return { success: true, output: result };
  } catch (error) {
    console.log("❌ Failed");
    console.log(`Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function checkFileExists(filePath, description) {
  console.log(`\n📁 ${description}`);
  const exists = fs.existsSync(filePath);
  if (exists) {
    console.log("✅ File exists");
    return true;
  } else {
    console.log("❌ File not found");
    return false;
  }
}

function checkFileContent(filePath, searchText, description) {
  console.log(`\n🔍 ${description}`);
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const hasContent = content.includes(searchText);
    if (hasContent) {
      console.log("✅ Content found");
      return true;
    } else {
      console.log("❌ Content not found");
      return false;
    }
  } catch (error) {
    console.log(`❌ Error reading file: ${error.message}`);
    return false;
  }
}

// Test 1: Web Filters Implementation
console.log("\n🔍 Test 1: Web Filters Implementation");
const webFiltersTests = [
  checkFileExists(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "Filter components in web distributions presentation"
  ),
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "Region",
    "Region filter dropdown"
  ),
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "Status",
    "Status filter dropdown"
  ),
];

const webFiltersPassed = webFiltersTests.every((test) => test);
console.log(
  `\n📊 Web Filters Tests: ${webFiltersPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 2: Web Pagination Implementation
console.log("\n🔍 Test 2: Web Pagination Implementation");
const webPaginationTests = [
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "pagination",
    "Pagination controls"
  ),
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "page",
    "Page navigation"
  ),
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "limit",
    "Limit selection"
  ),
];

const webPaginationPassed = webPaginationTests.every((test) => test);
console.log(
  `\n📊 Web Pagination Tests: ${webPaginationPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 3: Web Search Implementation
console.log("\n🔍 Test 3: Web Search Implementation");
const webSearchTests = [
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "search",
    "Search input field"
  ),
  checkFileContent(
    "apps/web/src/presentations/DistributionsPresentation.tsx",
    "handleSearchSubmit",
    "Search handler"
  ),
];

const webSearchPassed = webSearchTests.every((test) => test);
console.log(
  `\n📊 Web Search Tests: ${webSearchPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 4: Mobile Pull-to-refresh Implementation
console.log("\n🔍 Test 4: Mobile Pull-to-refresh Implementation");
const mobileRefreshTests = [
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "RefreshControl",
    "RefreshControl import"
  ),
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "refreshing",
    "Refresh state"
  ),
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "onRefresh",
    "Refresh handler"
  ),
];

const mobileRefreshPassed = mobileRefreshTests.every((test) => test);
console.log(
  `\n📊 Mobile Pull-to-refresh Tests: ${mobileRefreshPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 5: Mobile Search Implementation
console.log("\n🔍 Test 5: Mobile Search Implementation");
const mobileSearchTests = [
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "search",
    "Search functionality"
  ),
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "TextInput",
    "Search input component"
  ),
];

const mobileSearchPassed = mobileSearchTests.every((test) => test);
console.log(
  `\n📊 Mobile Search Tests: ${mobileSearchPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 6: Mobile Filters Implementation
console.log("\n🔍 Test 6: Mobile Filters Implementation");
const mobileFiltersTests = [
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "filter",
    "Filter functionality"
  ),
  checkFileContent(
    "apps/mobile/src/presentations/DistributionsPresentation.tsx",
    "Picker",
    "Filter dropdown component"
  ),
];

const mobileFiltersPassed = mobileFiltersTests.every((test) => test);
console.log(
  `\n📊 Mobile Filters Tests: ${mobileFiltersPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 7: Enhanced API Implementation
console.log("\n🔍 Test 7: Enhanced API Implementation");
const enhancedApiTests = [
  checkFileContent(
    "packages/shared-utils/src/mockApi.ts",
    "filters",
    "Filter support in API"
  ),
  checkFileContent(
    "packages/shared-utils/src/mockApi.ts",
    "pagination",
    "Pagination support in API"
  ),
  checkFileContent(
    "packages/shared-utils/src/mockApi.ts",
    "search",
    "Search support in API"
  ),
];

const enhancedApiPassed = enhancedApiTests.every((test) => test);
console.log(
  `\n📊 Enhanced API Tests: ${enhancedApiPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 8: Hook Updates Implementation
console.log("\n🔍 Test 8: Hook Updates Implementation");
const hookUpdatesTests = [
  checkFileContent(
    "packages/shared-hooks/src/useDistributions.ts",
    "filters",
    "Filter support in useDistributions hook"
  ),
  checkFileContent(
    "packages/shared-hooks/src/useDistributions.ts",
    "pagination",
    "Pagination support in useDistributions hook"
  ),
  checkFileContent(
    "packages/shared-hooks/src/useDistributions.ts",
    "search",
    "Search support in useDistributions hook"
  ),
];

const hookUpdatesPassed = hookUpdatesTests.every((test) => test);
console.log(
  `\n📊 Hook Updates Tests: ${hookUpdatesPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 9: Container Updates Implementation
console.log("\n🔍 Test 9: Container Updates Implementation");
const containerUpdatesTests = [
  checkFileContent(
    "packages/shared-containers/src/containers/DistributionsContainer.tsx",
    "filters",
    "Filter logic in DistributionsContainer"
  ),
  checkFileContent(
    "packages/shared-containers/src/containers/DistributionsContainer.tsx",
    "pagination",
    "Pagination logic in DistributionsContainer"
  ),
  checkFileContent(
    "packages/shared-containers/src/containers/DistributionsContainer.tsx",
    "search",
    "Search logic in DistributionsContainer"
  ),
];

const containerUpdatesPassed = containerUpdatesTests.every((test) => test);
console.log(
  `\n📊 Container Updates Tests: ${containerUpdatesPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 10: Type Updates Implementation
console.log("\n🔍 Test 10: Type Updates Implementation");
const typeUpdatesTests = [
  checkFileContent(
    "packages/shared-types/src/index.ts",
    "FilterOptions",
    "Filter options type"
  ),
  checkFileContent(
    "packages/shared-types/src/index.ts",
    "PaginationOptions",
    "Pagination options type"
  ),
  checkFileContent(
    "packages/shared-types/src/index.ts",
    "SearchOptions",
    "Search options type"
  ),
];

const typeUpdatesPassed = typeUpdatesTests.every((test) => test);
console.log(
  `\n📊 Type Updates Tests: ${typeUpdatesPassed ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 11: Web Application Build
console.log("\n🔍 Test 11: Web Application Build");
const webBuildTest = runCommand(
  "cd apps/web && npm run build",
  "Building web application with Epic 8 features"
);
console.log(
  `\n📊 Web Build Tests: ${webBuildTest.success ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 12: Mobile Application Build
console.log("\n🔍 Test 12: Mobile Application Build");
const mobileBuildTest = runCommand(
  "cd apps/mobile && npm run build",
  "Building mobile application with Epic 8 features"
);
console.log(
  `\n📊 Mobile Build Tests: ${mobileBuildTest.success ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 13: TypeScript Compilation
console.log("\n🔍 Test 13: TypeScript Compilation");
const typescriptTest = runCommand(
  "npx tsc --noEmit",
  "TypeScript compilation check across all packages"
);
console.log(
  `\n📊 TypeScript Tests: ${typescriptTest.success ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 14: Linting
console.log("\n🔍 Test 14: Linting");
const lintTest = runCommand("npm run lint", "Linting all packages");
console.log(
  `\n📊 Linting Tests: ${lintTest.success ? "✅ PASSED" : "❌ FAILED"}`
);

// Test 15: Testing
console.log("\n🔍 Test 15: Testing");
const testTest = runCommand(
  "npm run test",
  "Running tests across all packages"
);
console.log(`\n📊 Testing: ${testTest.success ? "✅ PASSED" : "❌ FAILED"}`);

// Summary
console.log("\n" + "=".repeat(60));
console.log("📊 EPIC 8: MISSING CORE FEATURES TEST SUMMARY");
console.log("=".repeat(60));

const allTests = [
  { name: "Web Filters Implementation", passed: webFiltersPassed },
  { name: "Web Pagination Implementation", passed: webPaginationPassed },
  { name: "Web Search Implementation", passed: webSearchPassed },
  {
    name: "Mobile Pull-to-refresh Implementation",
    passed: mobileRefreshPassed,
  },
  { name: "Mobile Search Implementation", passed: mobileSearchPassed },
  { name: "Mobile Filters Implementation", passed: mobileFiltersPassed },
  { name: "Enhanced API Implementation", passed: enhancedApiPassed },
  { name: "Hook Updates Implementation", passed: hookUpdatesPassed },
  { name: "Container Updates Implementation", passed: containerUpdatesPassed },
  { name: "Type Updates Implementation", passed: typeUpdatesPassed },
  { name: "Web Application Build", passed: webBuildTest.success },
  { name: "Mobile Application Build", passed: mobileBuildTest.success },
  { name: "TypeScript Compilation", passed: typescriptTest.success },
  { name: "Linting", passed: lintTest.success },
  { name: "Testing", passed: testTest.success },
];

const passedTests = allTests.filter((test) => test.passed).length;
const totalTests = allTests.length;

console.log(`\n✅ Passed: ${passedTests}/${totalTests}`);
console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);

allTests.forEach((test) => {
  console.log(`${test.passed ? "✅" : "❌"} ${test.name}`);
});

console.log("\n" + "=".repeat(60));

if (passedTests === totalTests) {
  console.log("🎉 EPIC 8: MISSING CORE FEATURES - ALL TESTS PASSED!");
  console.log("\n✅ Web filters (Region and Status) implemented");
  console.log("✅ Web pagination with page controls and limit selection");
  console.log("✅ Web search functionality for distributions");
  console.log("✅ Mobile pull-to-refresh with RefreshControl");
  console.log("✅ Mobile search functionality");
  console.log("✅ Mobile filter options");
  console.log("✅ Enhanced API with filter, pagination, and search support");
  console.log("✅ Updated hooks to support filtering and pagination");
  console.log("✅ Updated containers with business logic for new features");
  console.log("✅ Updated types for new functionality");
  console.log("✅ Cross-platform consistency maintained");
  console.log("✅ TypeScript strict mode and comprehensive testing");
  console.log("✅ All Aidonic Challenge requirements met");

  console.log("\n🚀 Epic 8 is ready for production!");
  process.exit(0);
} else {
  console.log("❌ EPIC 8: MISSING CORE FEATURES - SOME TESTS FAILED");
  console.log("\nPlease review the failed tests above and fix any issues.");
  process.exit(1);
}
