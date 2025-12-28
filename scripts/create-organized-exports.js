#!/usr/bin/env node

/**
 * Create Organized Export Structure
 *
 * This script reorganizes the package.json exports into separate,
 * maintainable files organized by category, following the pattern
 * recommended in ECOSYSTEM_GUIDELINES.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Create exports directory
const exportsDir = path.join(__dirname, '..', 'exports');
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// Organize exports by category
const exportCategories = {
  core: {},
  uiComponents: {},
  hooks: {},
  blocks: {},
  utils: {}
};

// Core exports
exportCategories.core["."] = packageJson.exports["."];
exportCategories.core["./components"] = packageJson.exports["./components"];

// UI Components
for (const [key, value] of Object.entries(packageJson.exports)) {
  if (key.startsWith("./components/") && !key.includes("/blocks/")) {
    exportCategories.uiComponents[key] = value;
  }
}

// Hooks
for (const [key, value] of Object.entries(packageJson.exports)) {
  if (key.startsWith("./hooks")) {
    exportCategories.hooks[key] = value;
  }
}

// Blocks by category
const blockCategories = [
  'about', 'article', 'background-pattern-hero', 'banner', 'blog', 'carousel',
  'case-studies-list', 'case-study-detail', 'comparison', 'contact', 'cta',
  'faq', 'features', 'footers', 'gallery', 'hero', 'industries', 'link-page',
  'list', 'logos', 'navbars', 'offer-modal', 'pricing', 'process',
  'project-detail', 'project-list', 'resource-detail', 'resource-list',
  'reviews', 'service-detail', 'services-list', 'stats', 'team', 'timeline'
];

const blockExports = {};
for (const category of blockCategories) {
  blockExports[category] = {};
}

for (const [key, value] of Object.entries(packageJson.exports)) {
  if (key.startsWith("./blocks/")) {
    const parts = key.split("/");
    const category = parts[2]; // blocks/category/component
    if (blockCategories.includes(category)) {
      if (!blockExports[category]) blockExports[category] = {};
      blockExports[category][key] = value;
    }
  }
}

// Utils, registry, types
for (const [key, value] of Object.entries(packageJson.exports)) {
  if (key === "./utils" || key === "./registry" || key === "./types") {
    exportCategories.utils[key] = value;
  }
}

// Write core exports
fs.writeFileSync(
  path.join(exportsDir, 'core.json'),
  JSON.stringify(exportCategories.core, null, 2)
);

// Write UI component exports
fs.writeFileSync(
  path.join(exportsDir, 'ui-components.json'),
  JSON.stringify(exportCategories.uiComponents, null, 2)
);

// Write hooks exports
fs.writeFileSync(
  path.join(exportsDir, 'hooks.json'),
  JSON.stringify(exportCategories.hooks, null, 2)
);

// Write utils exports
fs.writeFileSync(
  path.join(exportsDir, 'utils.json'),
  JSON.stringify(exportCategories.utils, null, 2)
);

// Write block category exports
const blocksDir = path.join(exportsDir, 'blocks');
if (!fs.existsSync(blocksDir)) {
  fs.mkdirSync(blocksDir, { recursive: true });
}

for (const [category, exports] of Object.entries(blockExports)) {
  if (Object.keys(exports).length > 0) {
    fs.writeFileSync(
      path.join(blocksDir, `${category}.json`),
      JSON.stringify(exports, null, 2)
    );
  }
}

// Generate a master export file that references all category files
const masterExport = {
  "description": "Master export map for @opensite/ui",
  "categories": {
    "core": "./exports/core.json",
    "uiComponents": "./exports/ui-components.json",
    "hooks": "./exports/hooks.json",
    "blocks": Object.fromEntries(
      blockCategories.map(cat => [cat, `./exports/blocks/${cat}.json`])
    ),
    "utils": "./exports/utils.json"
  },
  "stats": {
    "totalExports": Object.keys(packageJson.exports).length,
    "coreExports": Object.keys(exportCategories.core).length,
    "uiComponentExports": Object.keys(exportCategories.uiComponents).length,
    "hooksExports": Object.keys(exportCategories.hooks).length,
    "blockExports": Object.values(blockExports).reduce((sum, cat) => sum + Object.keys(cat).length, 0),
    "utilExports": Object.keys(exportCategories.utils).length
  }
};

fs.writeFileSync(
  path.join(exportsDir, 'index.json'),
  JSON.stringify(masterExport, null, 2)
);

console.log('✅ Organized export structure created!');
console.log(`   Core exports: ${masterExport.stats.coreExports}`);
console.log(`   UI component exports: ${masterExport.stats.uiComponentExports}`);
console.log(`   Hooks exports: ${masterExport.stats.hooksExports}`);
console.log(`   Block exports: ${masterExport.stats.blockExports}`);
console.log(`   Util exports: ${masterExport.stats.utilExports}`);
console.log(`   Total: ${masterExport.stats.totalExports}`);
console.log(`\n📁 Export files created in ./exports/`);
console.log(`   - exports/index.json (master index)`);
console.log(`   - exports/core.json`);
console.log(`   - exports/ui-components.json`);
console.log(`   - exports/hooks.json`);
console.log(`   - exports/utils.json`);
console.log(`   - exports/blocks/*.json (${blockCategories.length} category files)`);

// Create a README for the exports directory
const readme = `# Export Organization

This directory contains organized export maps for the @opensite/ui package.

## Structure

- \`index.json\` - Master index with references to all category files
- \`core.json\` - Core package exports (root, ./components)
- \`ui-components.json\` - All UI component exports
- \`hooks.json\` - React hooks exports
- \`utils.json\` - Utility exports (registry, types, utils)
- \`blocks/\` - Block exports organized by category

## Usage

While the package.json still contains the flat export structure for compatibility,
these organized files serve as documentation and can be used for:

1. Documentation generation
2. Export validation
3. Future refactoring to use Node.js export maps
4. Developer reference

## Updating

When adding new blocks or components, run:

\`\`\`bash
npm run generate:exports
\`\`\`

This will:
1. Scan all components
2. Generate manifest files
3. Merge into package.json
4. Regenerate organized export files
`;

fs.writeFileSync(
  path.join(exportsDir, 'README.md'),
  readme
);

console.log(`\n📄 README.md created in ./exports/`);
