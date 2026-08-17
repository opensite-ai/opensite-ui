#!/bin/bash

# Script to generate comprehensive list of all exports needed for package.json
# This creates organized export lists for all blocks and UI components

cd "$(dirname "$0")/.." || exit 1

echo "Generating comprehensive export manifest..."
echo ""

# Output directory for manifests
mkdir -p scripts/manifests

# Block categories are DERIVED from the directories that actually exist under
# components/blocks/ — never hand-maintained. A stale literal list here (and the
# one that used to live in merge-exports.js) silently dropped whole categories
# from package.json exports. merge-exports.js and create-organized-exports.js
# derive downstream of this, so the filesystem is the single source of truth.
categories=()
for dir in components/blocks/*/; do
  [ -d "$dir" ] || continue
  name=$(basename "$dir")
  [ "$name" = "__tests__" ] && continue
  categories+=("$name")
done

# Drop manifests for categories that no longer exist so a removed category
# cannot linger as a dead file feeding the downstream generators.
for manifest in scripts/manifests/blocks-*.json; do
  [ -e "$manifest" ] || continue
  stale=$(basename "$manifest" .json)
  stale=${stale#blocks-}
  if [ ! -d "components/blocks/${stale}" ]; then
    echo "Removing stale manifest for deleted category: ${stale}"
    rm -f "$manifest"
  fi
done

# Generate exports for each block category
for category in "${categories[@]}"; do

  echo "Processing blocks/${category}..."

  output_file="scripts/manifests/blocks-${category}.json"
  echo "[" > "$output_file"

  first=true
  for file in components/blocks/${category}/*.tsx; do
    [ -e "$file" ] || continue
    [ "$(basename "$file")" = "__tests__" ] && continue

    filename=$(basename "$file" .tsx)

    if [ "$first" = true ]; then
      first=false
    else
      echo "," >> "$output_file"
    fi

    cat >> "$output_file" << JSONEOF
  {
    "path": "./blocks/${category}/${filename}",
    "types": "./dist/${filename}.d.ts",
    "import": "./dist/${filename}.js",
    "require": "./dist/${filename}.cjs"
  }
JSONEOF
  done

  echo "" >> "$output_file"
  echo "]" >> "$output_file"
done

# Generate exports for UI components
echo "Processing ui components..."
output_file="scripts/manifests/ui-components.json"
echo "[" > "$output_file"

first=true
for file in components/ui/*.tsx; do
  [ -e "$file" ] || continue
  filename=$(basename "$file")
  [ "$filename" = "__tests__" ] && continue
  [[ "$filename" == *.test.tsx ]] && continue

  componentname=$(basename "$file" .tsx)

  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$output_file"
  fi

  cat >> "$output_file" << JSONEOF
  {
    "path": "./components/${componentname}",
    "types": "./dist/${componentname}.d.ts",
    "import": "./dist/${componentname}.js",
    "require": "./dist/${componentname}.cjs"
  }
JSONEOF
done

echo "" >> "$output_file"
echo "]" >> "$output_file"

# Generate exports for standalone root-level modules (shared primitives that are
# neither a block nor a components/ui component — e.g. lib/script-loader.ts
# re-exported through src/script-loader.ts). Driven by an explicit allowlist so
# nothing in src/ leaks into the public surface by accident.
echo "Processing root modules..."
output_file="scripts/manifests/root-modules.json"
echo "[" > "$output_file"

first=true
for modulename in script-loader; do
  [ -e "src/${modulename}.ts" ] || continue

  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$output_file"
  fi

  cat >> "$output_file" << JSONEOF
  {
    "path": "./${modulename}",
    "types": "./dist/${modulename}.d.ts",
    "import": "./dist/${modulename}.js",
    "require": "./dist/${modulename}.cjs"
  }
JSONEOF
done

echo "" >> "$output_file"
echo "]" >> "$output_file"

echo ""
echo "Export manifests generated in scripts/manifests/"
echo "Total categories: $(ls -1 scripts/manifests/*.json | wc -l)"
