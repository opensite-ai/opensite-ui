#!/usr/bin/env node

/**
 * Script to remove placeholder/default values from block components.
 * 
 * This script:
 * 1. Removes `const default*` declarations
 * 2. Removes default values from function parameters for content props
 * 
 * Run with: node scripts/remove-placeholders.mjs
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all block files recursively
function getAllBlockFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__' && entry.name !== 'node_modules') {
        files.push(...getAllBlockFiles(fullPath));
      }
    } else if (entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx') && entry.name !== 'index.ts') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  const changes = [];

  // Step 1: Find all default* variable names
  const defaultVarsToRemove = [];
  const identifyRegex = /^const (default[A-Z]\w*)\s*(?::\s*[^=]+)?\s*=/gm;
  let match;
  while ((match = identifyRegex.exec(content)) !== null) {
    defaultVarsToRemove.push(match[1]);
  }

  // Step 2: Remove the const declarations for each default* variable
  for (const varName of defaultVarsToRemove) {
    // Match array declarations: const defaultX = [...];
    const arrayDeclRegex = new RegExp(
      `^const ${varName}\\s*(?::\\s*[^=]+)?\\s*=\\s*\\[[\\s\\S]*?\\];?\\n\\n?`,
      'gm'
    );
    const beforeLength = content.length;
    content = content.replace(arrayDeclRegex, '');
    if (content.length !== beforeLength) {
      changes.push(`Removed const ${varName} (array)`);
      continue;
    }

    // Match object declarations: const defaultX = {...};
    const objectDeclRegex = new RegExp(
      `^const ${varName}\\s*(?::\\s*[^=]+)?\\s*=\\s*\\{[\\s\\S]*?\\};?\\n\\n?`,
      'gm'
    );
    content = content.replace(objectDeclRegex, '');
    if (content.length !== beforeLength) {
      changes.push(`Removed const ${varName} (object)`);
    }
  }

  // Step 3: Remove default value assignments in function parameters
  // Pattern: propName = defaultVarName -> propName
  for (const varName of defaultVarsToRemove) {
    const paramDefaultRegex = new RegExp(`(\\w+)\\s*=\\s*${varName}(?=[,\\)\\s])`, 'g');
    content = content.replace(paramDefaultRegex, (fullMatch, propName) => {
      changes.push(`Removed default: ${propName} = ${varName}`);
      return propName;
    });
  }

  // Step 4: Remove string literal defaults for common content props
  // These are props that represent user-facing content that should NOT have placeholder values
  // IMPORTANT: Only match in function parameter destructuring context (after { or ,)
  // NOT in JSX attributes or object literals
  const contentProps = [
    'title', 'heading', 'description', 'subtitle', 'content', 'text',
    'quote', 'author', 'role', 'company', 'testimonial', 'message',
    'badge', 'tagline', 'eyebrow', 'caption', 'summary', 'body', 'excerpt',
    'headline', 'subheading', 'overline', 'preheading', 'postHeading',
    'topLinkText', 'topLinkHref', 'ratingValue', 'ratingLabel',
    'ctaText', 'ctaLabel', 'buttonText', 'linkText',
    'price', 'currency', 'period', 'discount',
    'contactHeading', 'contactDescription', 'formHeading', 'formDescription',
    'monthlyLabel', 'yearlyLabel', 'yearlyBadge', 'monthlyInterval', 'yearlyInterval',
    'headingSubtitle',
  ];
  // Note: 'name' is intentionally excluded because it's commonly used in JSX attributes
  // like <DynamicIcon name="lucide/..." /> which should not be modified

  // Find the function parameter block and only modify within it
  // Look for patterns like: export function ComponentName({ prop = "value", ... }):
  const functionParamRegex = /export function \w+\(\{([^}]+)\}\):/gs;
  
  let functionMatch;
  while ((functionMatch = functionParamRegex.exec(content)) !== null) {
    const paramBlock = functionMatch[1];
    const paramBlockStart = functionMatch.index + functionMatch[0].indexOf('{') + 1;
    const paramBlockEnd = paramBlockStart + paramBlock.length;
    
    let newParamBlock = paramBlock;
    
    for (const prop of contentProps) {
      // Match prop = "string" or prop = 'string' or prop = `string`
      const stringDefaultRegex = new RegExp(
        `(${prop})\\s*=\\s*"[^"]*"`,
        'g'
      );
      const beforeLength = newParamBlock.length;
      newParamBlock = newParamBlock.replace(stringDefaultRegex, '$1');
      if (newParamBlock.length !== beforeLength) {
        changes.push(`Removed string default for: ${prop}`);
      }

      const singleQuoteRegex = new RegExp(
        `(${prop})\\s*=\\s*'[^']*'`,
        'g'
      );
      const beforeLength2 = newParamBlock.length;
      newParamBlock = newParamBlock.replace(singleQuoteRegex, '$1');
      if (newParamBlock.length !== beforeLength2) {
        changes.push(`Removed string default for: ${prop} (single quote)`);
      }

      const templateRegex = new RegExp(
        `(${prop})\\s*=\\s*\`[^\`]*\``,
        'gs'
      );
      const beforeLength3 = newParamBlock.length;
      newParamBlock = newParamBlock.replace(templateRegex, '$1');
      if (newParamBlock.length !== beforeLength3) {
        changes.push(`Removed template literal default for: ${prop}`);
      }
    }
    
    if (newParamBlock !== paramBlock) {
      content = content.slice(0, paramBlockStart) + newParamBlock + content.slice(paramBlockEnd);
    }
  }

  // Clean up any issues from removals
  // Remove double commas
  content = content.replace(/,(\s*),/g, ',');
  // Remove trailing commas before closing paren in function params
  content = content.replace(/,(\s*)\):/g, ')$1:');
  content = content.replace(/,(\s*)\)\s*{/g, ')$1 {');

  const modified = content !== originalContent;
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return { modified, changes };
}

// Main execution
const blocksDir = path.join(path.dirname(__dirname), 'components/blocks');
const files = getAllBlockFiles(blocksDir);

console.log(`Found ${files.length} block files to process\n`);

let modifiedCount = 0;
let totalChanges = 0;

for (const file of files) {
  try {
    const { modified, changes } = processFile(file);
    if (modified) {
      modifiedCount++;
      totalChanges += changes.length;
      console.log(`Modified: ${file.replace(path.dirname(__dirname) + '/', '')}`);
      for (const change of changes) {
        console.log(`  - ${change}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log(`\n========================================`);
console.log(`Modified ${modifiedCount} files with ${totalChanges} total changes`);
