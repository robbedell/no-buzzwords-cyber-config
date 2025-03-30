#!/bin/bash

echo "Starting settings transfer..."

# Create necessary directories if they don't exist
mkdir -p ~/.vscode
mkdir -p ~/.ssh
mkdir -p ~/.config/git

# 1. Transfer VS Code settings
echo "Transferring VS Code settings..."
cp ~/Library/Application\ Support/Code/User/settings.json ~/.vscode/settings.json 2>/dev/null || echo "No existing settings.json found"

# 2. Transfer Git configurations
echo "Transferring Git configurations..."
cp ~/.gitconfig ~/.config/git/config 2>/dev/null || echo "No existing .gitconfig found"

# 3. Transfer SSH keys and config
echo "Transferring SSH configurations..."
cp ~/.ssh/id_* ~/.ssh/ 2>/dev/null || echo "No existing SSH keys found"
cp ~/.ssh/config ~/.ssh/config 2>/dev/null || echo "No existing SSH config found"

# 4. Transfer GitHub credentials
echo "Transferring GitHub credentials..."
cp ~/.git-credentials ~/.git-credentials 2>/dev/null || echo "No existing Git credentials found"

# 5. Install recommended VS Code extensions
echo "Installing recommended VS Code extensions..."
code --install-extension ms-python.python
code --install-extension ms-vscode.cpptools
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension yzhang.markdown-all-in-one
code --install-extension ms-vscode-remote.remote-containers

# 6. Set up SSH agent
echo "Setting up SSH agent..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519 2>/dev/null || echo "No existing SSH key to add"

# 7. Verify GitHub SSH connection
echo "Verifying GitHub SSH connection..."
ssh -T git@github.com

# 8. Set up Git user configuration if not already set
echo "Setting up Git user configuration..."
if ! git config --global user.name > /dev/null 2>&1; then
    read -p "Enter your Git username: " git_username
    git config --global user.name "$git_username"
fi

if ! git config --global user.email > /dev/null 2>&1; then
    read -p "Enter your Git email: " git_email
    git config --global user.email "$git_email"
fi

# 9. Clone existing repositories
echo "Would you like to clone your existing repositories? (y/n)"
read -r clone_repos
if [ "$clone_repos" = "y" ]; then
    # Get list of repositories from GitHub
    echo "Fetching your repositories from GitHub..."
    repos=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user/repos | grep -o 'git@[^"]*' || echo "")
    
    if [ -n "$repos" ]; then
        mkdir -p ~/Development
        cd ~/Development
        
        for repo in $repos; do
            echo "Cloning $repo..."
            git clone "$repo"
        done
    else
        echo "No repositories found or GitHub token not set"
    fi
fi

echo "Transfer complete! Please check the output above for any errors."
echo "Note: You may need to restart VS Code for all changes to take effect." 