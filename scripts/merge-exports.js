#!/usr/bin/env node

/**
 * Merge Exports Script
 *
 * This script merges all export manifest files into the package.json,
 * organizing them by category for better maintainability while preserving
 * the tree-shaking export pattern required by the ECOSYSTEM_GUIDELINES.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Read all manifest files
const manifestsDir = path.join(__dirname, 'manifests');
const manifestFiles = fs.readdirSync(manifestsDir).filter(f => f.endsWith('.json'));

console.log(`Found ${manifestFiles.length} manifest files`);

// Collect all exports
const exportsByCategory = {};
let totalNewExports = 0;
let totalExistingExports = 0;

for (const manifestFile of manifestFiles) {
  const category = manifestFile.replace('.json', '');
  const manifestPath = path.join(manifestsDir, manifestFile);
  const exports = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  exportsByCategory[category] = exports;
  console.log(`  ${category}: ${exports.length} exports`);
}

// Build the new exports object
const newExports = {
  // Keep the root export
  ".": packageJson.exports["."],
  "./components": packageJson.exports["./components"],
};

// Add organized block categories.
//
// DERIVED from the manifests generate-all-exports.sh actually produced — never
// hand-maintained. A literal list here is a silent-drop trap: any category
// missing from it contributes zero exports, and the "uncategorized" catch-all
// at the bottom of this file can only rescue subpaths that are ALREADY in
// package.json, so a brand-new block in a missed category is dropped outright
// (consumers then hit ERR_PACKAGE_PATH_NOT_EXPORTED while this script exits 0).
// That is exactly what happened to `testimonials` while the list still carried
// a dead `reviews` entry. create-organized-exports.js derives the same way, and
// generate-all-exports.sh derives from components/blocks/*/ — one source of
// truth: the filesystem.
const blockCategories = Object.keys(exportsByCategory)
  .filter((key) => key.startsWith('blocks-'))
  .map((key) => key.slice('blocks-'.length))
  .sort();

console.log(`Derived ${blockCategories.length} block categories from manifests`);

// Add all block exports organized by category
for (const category of blockCategories) {
  const manifestKey = `blocks-${category}`;
  const exports = exportsByCategory[manifestKey] || [];

  for (const exp of exports) {
    const existingExport = packageJson.exports[exp.path];
    if (existingExport) {
      totalExistingExports++;
      // Keep existing export
      newExports[exp.path] = existingExport;
    } else {
      totalNewExports++;
      // Add new export
      newExports[exp.path] = {
        "types": exp.types,
        "import": exp.import,
        "require": exp.require
      };
    }
  }
}

// Add UI component exports
const uiExports = exportsByCategory['ui-components'] || [];
for (const exp of uiExports) {
  const existingExport = packageJson.exports[exp.path];
  if (existingExport) {
    totalExistingExports++;
    newExports[exp.path] = existingExport;
  } else {
    totalNewExports++;
    newExports[exp.path] = {
      "types": exp.types,
      "import": exp.import,
      "require": exp.require
    };
  }
}

// Add standalone root module exports (shared primitives such as ./script-loader)
const rootModuleExports = exportsByCategory['root-modules'] || [];
for (const exp of rootModuleExports) {
  const existingExport = packageJson.exports[exp.path];
  if (existingExport) {
    totalExistingExports++;
    newExports[exp.path] = existingExport;
  } else {
    totalNewExports++;
    newExports[exp.path] = {
      "types": exp.types,
      "import": exp.import,
      "require": exp.require
    };
  }
}

// Add hooks exports if they exist
if (packageJson.exports["./hooks"]) {
  newExports["./hooks"] = packageJson.exports["./hooks"];
}
if (packageJson.exports["./hooks/use-navigation"]) {
  newExports["./hooks/use-navigation"] = packageJson.exports["./hooks/use-navigation"];
}

// Add any other existing exports that weren't captured
for (const [key, value] of Object.entries(packageJson.exports)) {
  if (!newExports[key]) {
    newExports[key] = value;
    console.log(`  Preserving uncategorized export: ${key}`);
  }
}

// Update package.json with new exports
packageJson.exports = newExports;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('\n✅ Export merge complete!');
console.log(`   Total exports: ${Object.keys(newExports).length}`);
console.log(`   Existing exports preserved: ${totalExistingExports}`);
console.log(`   New exports added: ${totalNewExports}`);
console.log('\nNote: While the exports are now comprehensive, they are still in a flat structure.');
console.log('Consider refactoring to use export maps organized in separate files for better maintainability.');
