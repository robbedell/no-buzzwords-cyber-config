#!/bin/bash

# Development directory
export DEV_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Development"

# Common aliases
alias dev="cd $DEV_DIR"
alias github="cd $DEV_DIR/GitHub"
alias scripts="cd $DEV_DIR/Scripts"
alias configs="cd $DEV_DIR/Configs"

# Git aliases
alias gs="git status"
alias gc="git commit"
alias gp="git push"
alias gl="git log"
alias gd="git diff"
alias gco="git checkout"

# Docker aliases
alias dc="docker-compose"
alias dps="docker ps"
alias dex="docker exec"
alias dim="docker images"

# Python aliases
alias py="python3"
alias pip="pip3"
alias venv="python3 -m venv"

# Development tools
alias cursor="open -a Cursor"
alias code="open -a 'Visual Studio Code'"

# Function to create a new Python virtual environment
function create_venv() {
    if [ -z "$1" ]; then
        echo "Usage: create_venv <environment_name>"
        return 1
    fi
    python3 -m venv "$1"
    source "$1/bin/activate"
    pip install --upgrade pip
}

# Function to start development services
function start_dev() {
    cd "$DEV_DIR"
    docker-compose -f Configs/docker-compose.yml up -d
    echo "Development services started"
}

# Function to stop development services
function stop_dev() {
    cd "$DEV_DIR"
    docker-compose -f Configs/docker-compose.yml down
    echo "Development services stopped"
}
