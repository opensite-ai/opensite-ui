#!/usr/bin/env node

/**
 * Export Registry to JSON
 *
 * This script exports the @opensite/ui BLOCK_REGISTRY to JSON format
 * for consumption by the Octane Rust application. It excludes React
 * component references since they cannot be serialized.
 *
 * Usage:
 *   node scripts/export-registry.js
 *
 * Output:
 *   registry-export.json (root directory)
 *   builder-contract-bundle.json (root directory)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the compiled registry (ES module version)
import {
  createBuilderContractBundle,
  getAllBlocks,
} from '../dist/registry.js';

/**
 * Serialize a block entry to JSON-safe format
 * Excludes the React component reference which cannot be serialized
 */
function serializeBlockEntry(block) {
  return {
    id: block.id,
    name: block.name,
    description: block.description,
    semanticTags: block.semanticTags,
    category: block.category,
    // Exclude 'component' - React component reference
    props: block.props,
    exampleUsage: block.exampleUsage,
    importantUsageNotes: block.importantUsageNotes ?? null,
    usageRequirements: block.usageRequirements ?? null,
    exampleProps: block.exampleProps ?? null,
  };
}

function loadBlockSources() {
  const manifestsDir = path.join(__dirname, 'manifests');
  const manifestFiles = fs
    .readdirSync(manifestsDir)
    .filter((fileName) => /^blocks-.*\.json$/.test(fileName));

  return manifestFiles.reduce((accumulator, fileName) => {
    const manifestPath = path.join(manifestsDir, fileName);
    const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    for (const entry of entries) {
      const exportPath = entry.path;
      const blockId = exportPath.split('/').pop();

      accumulator[blockId] = {
        exportPath,
        modulePath: `@opensite/ui/${exportPath.replace(/^\.\//, '')}`,
        typesPath: entry.types,
        importPath: entry.import,
        requirePath: entry.require,
      };
    }

    return accumulator;
  }, {});
}

/**
 * Export the registry to JSON
 */
function exportRegistry() {
  console.log('🔍 Loading @opensite/ui block registry...');

  try {
    // Get all blocks from the registry
    const blocks = getAllBlocks();
    const blockSources = loadBlockSources();
    const exportedAt = new Date().toISOString();

    console.log(`📦 Found ${blocks.length} blocks in registry`);

    // Serialize each block (excluding React component references)
    const serializedBlocks = blocks.map(serializeBlockEntry);

    // Read package.json for version
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Create export object
    const exportData = {
      metadata: {
        exportedAt,
        totalBlocks: serializedBlocks.length,
        version: packageJson.version,
        source: '@opensite/ui',
      },
      blocks: serializedBlocks,
    };

    const builderContractBundle = createBuilderContractBundle({
      blocks,
      uiVersion: packageJson.version,
      exportedAt,
      source: packageJson.name,
      blockSources,
    });

    // Write to JSON file
    const outputPath = path.join(__dirname, '..', 'registry-export.json');
    const contractOutputPath = path.join(
      __dirname,
      '..',
      'builder-contract-bundle.json',
    );

    fs.writeFileSync(
      outputPath,
      JSON.stringify(exportData, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      contractOutputPath,
      JSON.stringify(builderContractBundle, null, 2),
      'utf8'
    );

    console.log(`✅ Registry exported to: ${outputPath}`);
    console.log(`✅ Builder contract exported to: ${contractOutputPath}`);
    console.log(`📊 Total blocks exported: ${serializedBlocks.length}`);

    // Print category breakdown
    const categoryCounts = serializedBlocks.reduce((acc, block) => {
      acc[block.category] = (acc[block.category] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📋 Category breakdown:');
    Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`);
      });

  } catch (error) {
    console.error('❌ Error exporting registry:', error);
    process.exit(1);
  }
}

// Run the export
exportRegistry();
