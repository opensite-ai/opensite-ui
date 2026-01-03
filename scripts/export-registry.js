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
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the compiled registry (ES module version)
import { getAllBlocks } from '../dist/registry.js';

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
  };
}

/**
 * Export the registry to JSON
 */
function exportRegistry() {
  console.log('🔍 Loading @opensite/ui block registry...');

  try {
    // Get all blocks from the registry
    const blocks = getAllBlocks();

    console.log(`📦 Found ${blocks.length} blocks in registry`);

    // Serialize each block (excluding React component references)
    const serializedBlocks = blocks.map(serializeBlockEntry);

    // Read package.json for version
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Create export object
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        totalBlocks: serializedBlocks.length,
        version: packageJson.version,
        source: '@opensite/ui',
      },
      blocks: serializedBlocks,
    };

    // Write to JSON file
    const outputPath = path.join(__dirname, '..', 'registry-export.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify(exportData, null, 2),
      'utf8'
    );

    console.log(`✅ Registry exported to: ${outputPath}`);
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
