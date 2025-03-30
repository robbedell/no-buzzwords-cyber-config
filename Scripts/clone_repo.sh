#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./clone_repo.sh <repository-name>"
    echo "Example: ./clone_repo.sh my-repo"
    exit 1
fi

REPO_NAME=$1
REPO_URL="git@github.com:robbedell/$REPO_NAME.git"
TARGET_DIR=~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects/$REPO_NAME

echo "Removing existing directory if it exists..."
rm -rf "$TARGET_DIR"

echo "Cloning $REPO_NAME..."
git clone "$REPO_URL" "$TARGET_DIR" 