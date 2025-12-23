/**
 * Validation script to test that all module exports are working correctly
 * Run with: node validate-exports.mjs
 */

console.log("🔍 Validating @opensite/ui exports...\n");

let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passedTests++;
  } catch (error) {
    console.error(`❌ ${description}`);
    console.error(`   Error: ${error.message}`);
    failedTests++;
  }
}

// Test main exports
test("Main export index", async () => {
  const { Container, Section, AnimatedDialog, PageHeroBanner, Button, Card, Badge, Popover, cn } = await import("./dist/index.js");
  if (!Container || !Section || !AnimatedDialog || !PageHeroBanner || !cn) {
    throw new Error("Missing main exports");
  }
});

// Test components export
test("Components grouped export", async () => {
  const { Container, Section, AnimatedDialog, PageHeroBanner } = await import("./dist/components.js");
  if (!Container || !Section || !AnimatedDialog || !PageHeroBanner) {
    throw new Error("Missing components exports");
  }
});

// Test individual component exports
test("Container individual export", async () => {
  const { Container } = await import("./dist/container.js");
  if (!Container) {
    throw new Error("Container export missing");
  }
});

test("Section individual export", async () => {
  const { Section } = await import("./dist/section.js");
  if (!Section) {
    throw new Error("Section export missing");
  }
});

test("AnimatedDialog individual export", async () => {
  const { AnimatedDialog } = await import("./dist/animated-dialog.js");
  if (!AnimatedDialog) {
    throw new Error("AnimatedDialog export missing");
  }
});

test("PageHeroBanner individual export", async () => {
  const { PageHeroBanner } = await import("./dist/page-hero-banner.js");
  if (!PageHeroBanner) {
    throw new Error("PageHeroBanner export missing");
  }
});

// Test utility exports
test("Utils export", async () => {
  const { cn } = await import("./dist/utils.js");
  if (!cn || typeof cn !== "function") {
    throw new Error("cn utility function missing or invalid");
  }
});

// Test TypeScript declarations exist
test("TypeScript declarations", async () => {
  const fs = await import("fs");
  const path = await import("path");

  const files = [
    "./dist/index.d.ts",
    "./dist/components.d.ts",
    "./dist/container.d.ts",
    "./dist/section.d.ts",
    "./dist/animated-dialog.d.ts",
    "./dist/page-hero-banner.d.ts",
    "./dist/utils.d.ts",
    "./dist/types.d.ts",
  ];

  for (const file of files) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing declaration file: ${file}`);
    }
  }
});

// Test CommonJS exports
test("CommonJS compatibility", async () => {
  const fs = await import("fs");

  const cjsFiles = [
    "./dist/index.cjs",
    "./dist/components.cjs",
    "./dist/container.cjs",
    "./dist/section.cjs",
  ];

  for (const file of cjsFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing CJS file: ${file}`);
    }
  }
});

// Summary
console.log(`\n${"=".repeat(50)}`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`${"=".repeat(50)}`);

if (failedTests > 0) {
  console.error("\n❌ Validation failed! Please fix the errors above.");
  process.exit(1);
} else {
  console.log("\n✅ All exports validated successfully!");
  console.log("\nModule is ready for use. To test in a consuming application:");
  console.log("  1. In this directory: pnpm link");
  console.log("  2. In consuming app: pnpm link @opensite/ui");
  console.log("  3. Import components: import { Container } from '@opensite/ui/components/container';");
}
