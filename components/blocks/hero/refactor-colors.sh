#!/bin/bash

# Script to refactor color classes in hero blocks
# Removes redundant text-foreground and converts absolute colors to semantic ones

cd "$(dirname "$0")"

# Function to refactor a single file
refactor_file() {
    local file="$1"
    echo "Refactoring $file..."
    
    # Remove redundant text-foreground from headings and text elements
    # Keep text-muted-foreground and text-primary as they serve specific purposes
    sed -i '' 's/text-foreground lg:/lg:/g' "$file"
    sed -i '' 's/text-foreground md:/md:/g' "$file"
    sed -i '' 's/text-foreground sm:/sm:/g' "$file"
    sed -i '' 's/text-foreground xl:/xl:/g' "$file"
    sed -i '' 's/text-foreground"/"/' "$file"
    sed -i '' 's/text-foreground /" /' "$file"
    
    # Convert bg-black to bg-foreground
    sed -i '' 's/bg-black\//bg-foreground\//g' "$file"
    sed -i '' 's/bg-black"/bg-foreground"/g' "$file"
    sed -i '' 's/bg-black /bg-foreground /g' "$file"
    
    # Convert text-white to text-background
    sed -i '' 's/text-white\//text-background\//g' "$file"
    sed -i '' 's/text-white"/text-background"/g' "$file"
    sed -i '' 's/text-white /text-background /g' "$file"
    
    # Convert bg-white to bg-background (but be careful with bg-white/)
    sed -i '' 's/bg-white\//bg-background\//g' "$file"
    
    # Convert text-black to remove it (let Section handle)
    sed -i '' 's/text-black\//\//g' "$file"
    sed -i '' 's/text-black"/"/g' "$file"
    sed -i '' 's/text-black /  /g' "$file"
    
    # Convert text-gray-900 to remove it
    sed -i '' 's/text-gray-900"/"/g' "$file"
    sed -i '' 's/text-gray-900 / /g' "$file"
}

# Refactor all hero blocks
for file in hero-*.tsx; do
    if [ -f "$file" ]; then
        refactor_file "$file"
    fi
done

echo "Refactoring complete!"

