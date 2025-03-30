# <img src="palo_alto/.logos/palo_alto.svg" alt="Palo Alto Networks Logo" width="32" height="32"> Configuration Management

This directory contains various configuration files and automation scripts for managing development environments and infrastructure.

## Directory Structure

```
Configs/
├── cursor/                   # IDE environment configurations
│   ├── .vscode/            # VS Code/Cursor settings
│   └── README.md           # IDE configuration documentation
├── palo_alto/               # Palo Alto Networks configurations
│   ├── .logos/             # Palo Alto Networks logos
│   ├── vm_series/          # VM-Series configurations
│   └── README.md           # Palo Alto Networks documentation
└── README.md                # This file
```

## Quick Start

1. **IDE Setup**

   ```bash
   # Navigate to cursor directory
   cd cursor

   # Follow README for IDE configuration
   ```

2. **Palo Alto Networks Setup**

   ```bash
   # Navigate to palo_alto directory
   cd palo_alto

   # Follow README for deployment and configuration
   ```

## Documentation

- [IDE Configuration Guide](cursor/README.md)

  - VS Code/Cursor settings
  - Folder icons and themes
  - Editor configurations

- [Palo Alto Networks Guide](palo_alto/README.md)
  - VM-Series deployment
  - Infrastructure automation
  - Security configurations

## Support

For issues or questions:

1. Check the component-specific documentation
2. Review the troubleshooting guides
3. Contact your system administrator

# Development Configurations

This directory contains configuration files for various development tools and environments used in the workspace.

## Files

### Python Configuration

- `python_config.py`: Common Python settings for development
  - Logging configuration
  - Development environment settings
  - Testing configuration
  - Code formatting settings

### Docker Configuration

- `docker-compose.yml`: Development services configuration
  - PostgreSQL database
  - Redis cache
  - pgAdmin for database management
  - Persistent volumes for data storage

### Shell Configuration

- `shell_config.sh`: Shell aliases and functions
  - Common directory navigation
  - Git shortcuts
  - Docker commands
  - Python virtual environment management
  - Development service management

## Usage

### Python Configuration

```python
from Configs.python_config import *

# Use the configuration
print(DEBUG)  # True
print(MAX_LINE_LENGTH)  # 100
```

### Docker Services

```bash
# Start development services
start_dev

# Stop development services
stop_dev
```

### Shell Configuration

Add to your `.bashrc` or `.zshrc`:

```bash
source "$DEV_DIR/Configs/shell_config.sh"
```

## Adding New Configurations

When adding new configuration files:

1. Keep them organized by tool/technology
2. Include clear documentation
3. Use consistent naming conventions
4. Add relevant entries to this README
