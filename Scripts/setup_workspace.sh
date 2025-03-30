#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f GitHub/.env ]; then
    source GitHub/.env
fi

# Configuration
WORKSPACE_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Development"
WORKSPACE_FILE="$WORKSPACE_DIR/Workspaces/Development.code-workspace"

# Create necessary directories
echo "Creating directory structure..."
mkdir -p "$WORKSPACE_DIR/GitHub"
mkdir -p "$WORKSPACE_DIR/Scripts"
mkdir -p "$WORKSPACE_DIR/Configs"
mkdir -p "$WORKSPACE_DIR/Workspaces"

# Initialize and update submodules
echo "Initializing submodules..."
if [ -n "$GITHUB_TOKEN" ]; then
    echo "Using GitHub token for authentication..."
    git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
fi
git submodule init
git submodule update --recursive

# Open workspace in Cursor
echo "Opening workspace in Cursor..."
if command -v cursor &> /dev/null; then
    cursor "$WORKSPACE_FILE"
else
    echo "Cursor is not installed. Please install Cursor and run this script again."
    exit 1
fi

echo "Workspace setup complete!"
