#!/bin/bash

# Create the Projects directory if it doesn't exist
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects

# Clone each repository, excluding cvelistV5
gh repo list robbedell --limit 100 | awk '{print $1}' | grep -v "cvelistV5" | while read repo; do
    repo_name=$(basename "$repo")
    target_dir=~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects/"$repo_name"
    
    echo "Removing existing directory if it exists..."
    rm -rf "$target_dir"
    
    echo "Cloning $repo..."
    gh repo clone "$repo" "$target_dir"
done 