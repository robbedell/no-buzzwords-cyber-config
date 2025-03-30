#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check if running on macOS
if [[ "$(uname)" != "Darwin" ]]; then
    print_error "This script is designed for macOS only."
    exit 1
fi

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    print_status "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    print_status "Homebrew is already installed"
fi

# Install required software
print_status "Installing required software..."
brew install --cask cursor
brew install gh
brew install git
brew install python
brew install node
brew install --cask docker

# Configure Git
print_status "Configuring Git..."
git config --global user.name "robbedell"
git config --global user.email "robert.bedell@live.com"
git config --global init.defaultBranch main

# Verify Git configuration
print_status "Verifying Git configuration..."
git config --global --list

# Set up SSH key
print_status "Setting up SSH key..."
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -C "robert.bedell@live.com"
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
    print_status "Your SSH public key:"
    cat ~/.ssh/id_ed25519.pub
    print_warning "Please add this key to your GitHub account"
else
    print_status "SSH key already exists"
fi

# Create development directory structure
print_status "Creating development directory structure..."
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Scripts
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Configs
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Workspaces

# Authenticate with GitHub
print_status "Authenticating with GitHub..."
gh auth login

# Initialize Git repository if not already initialized
if [ ! -d .git ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Initialize and update submodules
print_status "Initializing submodules..."
git submodule init
git submodule update --recursive

# Verify installations
print_status "Verifying installations..."
echo "Checking Homebrew..."
brew doctor

echo "Checking Git..."
git --version

echo "Checking GitHub CLI..."
gh --version

echo "Checking Python..."
python3 --version

echo "Checking Node.js..."
node --version

echo "Checking Docker..."
docker --version

print_status "Setup complete! You can now run ./Scripts/setup_workspace.sh to open the workspace in Cursor."
