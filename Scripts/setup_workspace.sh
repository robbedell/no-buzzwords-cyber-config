#!/bin/bash

# Exit on error
set -e

# Configuration
WORKSPACE_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Development"
WORKSPACE_FILE="$WORKSPACE_DIR/Workspaces/robbedell.code-workspace"

# Create necessary directories
echo "Creating directory structure..."
mkdir -p "$WORKSPACE_DIR/Projects"
mkdir -p "$WORKSPACE_DIR/Scripts"
mkdir -p "$WORKSPACE_DIR/Configs"
mkdir -p "$WORKSPACE_DIR/Workspaces"

# Clone repositories if they don't exist
echo "Cloning repositories..."
if [ ! -d "$WORKSPACE_DIR/Projects/cve_config_generation" ]; then
    gh repo clone robbedell/cve_config_generation "$WORKSPACE_DIR/Projects/cve_config_generation"
fi

if [ ! -d "$WORKSPACE_DIR/Projects/palo_alto_poc" ]; then
    gh repo clone robbedell/palo_alto_poc "$WORKSPACE_DIR/Projects/palo_alto_poc"
fi

# Open workspace in Cursor
echo "Opening workspace in Cursor..."
if command -v cursor &> /dev/null; then
    cursor "$WORKSPACE_FILE"
else
    echo "Cursor is not installed. Please install Cursor and run this script again."
    exit 1
fi

echo "Workspace setup complete!"
