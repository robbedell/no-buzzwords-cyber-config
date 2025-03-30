# Development Environment Setup Guide

This guide provides step-by-step instructions for setting up a new development environment with Cursor, GitHub integration, and all necessary tools.

## Prerequisites

1. macOS (this guide is written for macOS)
2. iCloud Drive enabled
3. Apple ID configured
4. Terminal access

## Step 1: Install Required Tools

### Homebrew Installation

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Required Software

```bash
# Install Cursor
brew install --cask cursor

# Install GitHub CLI
brew install gh

# Install Git
brew install git

# Install Python
brew install python

# Install Node.js (if needed)
brew install node

# Install Docker (if needed)
brew install --cask docker
```

## Step 2: Configure Git

```bash
# Configure Git with your information
git config --global user.name "robbedell"
git config --global user.email "robert.bedell@live.com"

# Configure default branch name
git config --global init.defaultBranch main

# Verify Git configuration
git config --global --list
```

## Step 3: Set Up GitHub Authentication

1. Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

2. Start the SSH agent:

```bash
eval "$(ssh-agent -s)"
```

3. Add your SSH key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

4. Copy your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

5. Add the key to your GitHub account:
   - Go to GitHub Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your key and save

6. Authenticate with GitHub CLI:

```bash
gh auth login
```

## Step 4: Set Up Development Directory Structure

```bash
# Create the main development directory in iCloud Drive
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development

# Create subdirectories
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Scripts
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Configs
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Workspaces
```

## Step 5: Clone Setup Scripts

1. Clone the setup scripts repository (if you have one) or copy the setup scripts from your existing environment:

```bash
# If you have a setup scripts repository:
gh repo clone your-username/setup-scripts ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Scripts
```

2. Make the setup script executable:

```bash
chmod +x ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Scripts/setup_workspace.sh
```

## Step 6: Run Setup Script

```bash
~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Scripts/setup_workspace.sh
```

This script will:

- Create the necessary directory structure
- Clone all your repositories
- Install recommended extensions
- Open the workspace in Cursor

## Step 7: Configure Cursor Extensions

The setup script will install recommended extensions, but you may need to:

1. Open Cursor
2. Go to Extensions (Cmd+Shift+X)
3. Install any additional extensions you prefer

## Step 8: Verify Setup

1. Check that all repositories are cloned:

```bash
ls ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development/Projects
```

2. Verify Git configuration:

```bash
git config --global --list
```

3. Verify GitHub authentication:

```bash
gh auth status
```

4. Test SSH connection to GitHub:

```bash
ssh -T git@github.com
```

## Troubleshooting

### Common Issues

1. **iCloud Drive Sync Issues**
   - Ensure iCloud Drive is enabled in System Preferences
   - Check iCloud storage space
   - Wait for initial sync to complete

2. **GitHub Authentication Issues**
   - Verify Git global configuration (username and email)
   - Verify SSH key is added to GitHub
   - Check SSH agent is running
   - Ensure GitHub CLI is authenticated

3. **Cursor Issues**
   - Restart Cursor after installation
   - Check for updates
   - Verify workspace file permissions

### Getting Help

- GitHub Issues: Check repository issues
- Cursor Documentation: [Cursor Docs](https://cursor.sh/docs)
- GitHub CLI Documentation: [GitHub CLI Docs](https://cli.github.com/manual/)

## Maintenance

### Updating the Environment

1. Update Homebrew packages:

```bash
brew update && brew upgrade
```

2. Update Cursor:

```bash
brew upgrade --cask cursor
```

3. Update GitHub CLI:

```bash
brew upgrade gh
```

### Backup

The workspace configuration is stored in iCloud Drive, so it's automatically backed up. However, you may want to:

1. Export your Cursor settings
2. Backup your SSH keys
3. Document any custom configurations

## Additional Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Git Documentation](https://git-scm.com/doc)
- [Homebrew Documentation](https://docs.brew.sh)
