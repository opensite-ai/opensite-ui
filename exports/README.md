# Export Organization

This directory contains organized export maps for the @opensite/ui package.

## Structure

- `index.json` - Master index with references to all category files
- `core.json` - Core package exports (root, ./components)
- `ui-components.json` - All UI component exports
- `hooks.json` - React hooks exports
- `utils.json` - Utility exports (registry, types, utils)
- `root-modules.json` - Standalone root-level primitives (e.g. `./script-loader`)
- `blocks/` - Block exports organized by category

## Usage

While the package.json still contains the flat export structure for compatibility,
these organized files serve as documentation and can be used for:

1. Documentation generation
2. Export validation
3. Future refactoring to use Node.js export maps
4. Developer reference

## Updating

When adding new blocks or components, run:

```bash
npm run generate:exports
```

This will:
1. Scan all components
2. Generate manifest files
3. Merge into package.json
4. Regenerate organized export files
