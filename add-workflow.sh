#!/bin/bash
# Script to add workflow file via GitHub API

CONTENT=$(cat .github/workflows/deploy.yml | base64 | tr -d '\n')

gh api repos/jaxxat1300/Product-Management-Study-Guide/contents/.github/workflows/deploy.yml \
  -X PUT \
  -f message="Add GitHub Actions workflow for Pages deployment" \
  -f content="$CONTENT" \
  -f branch=main

echo ""
echo "✅ Workflow file added! Check: https://github.com/jaxxat1300/Product-Management-Study-Guide/actions"

