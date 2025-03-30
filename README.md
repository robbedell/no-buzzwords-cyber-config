# Development Workspace

This repository contains my development workspace configuration, including scripts, settings, and project repositories. This workspace is designed to be easily set up on any macOS machine with iCloud Drive enabled.

## Projects

This workspace contains the following projects as Git submodules:

- [cve_config_generation](Projects/cve_config_generation)
- [palo_alto_poc](Projects/palo_alto_poc)

## Prerequisites

Before starting the setup process, ensure you have:

- macOS installed
- iCloud Drive enabled
- Apple ID configured
- Terminal access
- GitHub account with SSH key access

## Setup Process

### Step 1: Clone the Repository

First, clone this repository with the `--recursive` flag to include all submodules:

```bash
git clone --recursive https://github.com/robbedell/development.git ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development
```

### Step 2: Initial Setup

Run the initial setup script to:

- Install required software (Homebrew, Cursor, Git, Python, Node.js, Docker)
- Configure Git with your credentials
- Set up SSH key for GitHub
- Create necessary directory structure
- Authenticate with GitHub
- Initialize Git repository and submodules

```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Development
chmod +x Scripts/initial_setup.sh  # Make the script executable
./Scripts/initial_setup.sh
```

**Note**: During this step, you'll be prompted to:

1. Add your SSH key to GitHub (if not already done)
2. Authenticate with GitHub CLI
3. Review and confirm software installations

### Step 3: Open Workspace in Cursor

After the initial setup is complete, run the workspace setup script to:

- Ensure all directories are properly created
- Initialize and update Git submodules
- Open the workspace in Cursor

```bash
chmod +x Scripts/setup_workspace.sh  # Make the script executable
./Scripts/setup_workspace.sh
```

## Directory Structure

- `Projects/` - Contains project repositories as Git submodules
  - `cve_config_generation/` - CVE configuration generation project
  - `palo_alto_poc/` - Palo Alto POC project
- `Scripts/` - Setup and utility scripts
  - `initial_setup.sh` - One-time setup script for new installations
  - `setup_workspace.sh` - Script to open workspace in Cursor
- `Configs/` - Configuration files
- `Workspaces/` - Cursor workspace settings

## Maintenance

### Updating Projects

To update all submodules to their latest versions:

```bash
git submodule update --remote --merge
```

### Adding New Projects

To add a new project as a submodule:

```bash
git submodule add <repository-url> Projects/<project-name>
git commit -m "Add new project: <project-name>"
```

### Troubleshooting

If you encounter issues:

1. Ensure all prerequisites are met
2. Check that iCloud Drive is properly synced
3. Verify GitHub authentication is working
4. Try running `git submodule update --init --recursive` to reinitialize submodules

## Requirements

- macOS
- iCloud Drive enabled
- Apple ID configured
- Terminal access
- GitHub account with SSH key access
- Internet connection for software installation
