#!/bin/bash

# Script to generate comprehensive list of all exports needed for package.json
# This creates organized export lists for all blocks and UI components

cd "$(dirname "$0")/.." || exit 1

echo "Generating comprehensive export manifest..."
echo ""

# Output directory for manifests
mkdir -p scripts/manifests

# Generate exports for each block category
for category in about article background-pattern-hero banner blog carousel \
  case-studies-list case-study-detail comparison contact cta faq features \
  footers gallery hero industries link-page list logos navbars offer-modal \
  pricing process project-detail project-list resource-detail resource-list \
  reviews service-detail services-list stats team timeline; do

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

echo ""
echo "Export manifests generated in scripts/manifests/"
echo "Total categories: $(ls -1 scripts/manifests/*.json | wc -l)"
