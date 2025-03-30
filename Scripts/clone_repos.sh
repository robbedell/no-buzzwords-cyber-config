#!/bin/bash

# Create the Projects directory if it doesn't exist
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects

# Fetch all repositories using SSH URLs, excluding cvelistV5
curl -s https://api.github.com/users/robbedell/repos | grep -o '"ssh_url":"[^"]*"' | cut -d'"' -f4 | grep -v "cvelistV5" | while read repo; do
    # Extract repository name from URL
    repo_name=$(basename "$repo" .git)
    target_dir=~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects/"$repo_name"
    
    echo "Removing existing directory if it exists..."
    rm -rf "$target_dir"
    
    echo "Cloning $repo_name..."
    git clone "$repo" "$target_dir"
done 