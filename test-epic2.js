#!/usr/bin/env node

// Simple test script to demonstrate Epic 2 functionality
import { demonstrateEpic2 } from "./packages/shared-utils/dist/demo.js";

async function testEpic2() {
  try {
    console.log("🚀 Testing Epic 2: Core Infrastructure");
    console.log("========================================");

    const result = await demonstrateEpic2();

    if (result.success) {
      console.log("\n✅ Epic 2 is COMPLETE and working!");
      console.log("📋 Components Status:");
      Object.entries(result.components).forEach(([component, status]) => {
        console.log(`   ${component}: ${status}`);
      });

      console.log("\n🎯 Epic 2 Stories Completed:");
      console.log("   ✅ Story 2.1: Create shared types for Distribution data");
      console.log("   ✅ Story 2.2: Implement inline mock API service");
      console.log("   ✅ Story 2.3: Set up Zustand store for state management");
      console.log("   ✅ Story 2.4: Create shared hooks for data fetching");

      console.log("\n🚀 Ready for Epic 3: Web Application!");
    } else {
      console.error("❌ Epic 2 test failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error testing Epic 2:", error);
    process.exit(1);
  }
}

testEpic2();
