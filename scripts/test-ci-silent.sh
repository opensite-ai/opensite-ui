#!/bin/bash
# Silent test runner for CI/CD pipelines
# Runs tests without verbose output and exits with test exit code

vitest run --silent 2>/dev/null || {
  echo "Tests failed. Run 'pnpm test' for details."
  exit 1
}
