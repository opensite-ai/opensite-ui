#!/bin/bash
# Test runner that only outputs failures
# Usage: ./scripts/test-failures-only.sh [optional vitest args]
#
# Examples:
#   ./scripts/test-failures-only.sh                    # Run all tests, show only failures
#   ./scripts/test-failures-only.sh --bail 5           # Stop after 5 failures
#   ./scripts/test-failures-only.sh components/blocks  # Run tests in specific directory

set -o pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create temp file for output
TEMP_OUTPUT=$(mktemp)
trap "rm -f $TEMP_OUTPUT" EXIT

echo -e "${YELLOW}Running tests...${NC}"

# Run vitest with dot reporter (minimal output during run)
# Capture both stdout and stderr
npx vitest run --reporter=dot "$@" > "$TEMP_OUTPUT" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  # All tests passed - show summary only
  echo -e "${GREEN}✓ All tests passed!${NC}"
  # Show the summary line
  tail -5 "$TEMP_OUTPUT" | grep -E "Tests|Duration"
else
  # Tests failed - show only the failure information
  echo -e "${RED}✗ Some tests failed:${NC}"
  echo ""

  # Extract failure information starting from "Failed Tests" header
  # Use sed to extract from the failure section to the end
  sed -n '/Failed Tests/,$p' "$TEMP_OUTPUT"
fi

exit $EXIT_CODE

