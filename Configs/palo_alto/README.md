# <img src=".logos/palo_alto.svg" alt="Palo Alto Networks Logo" width="32" height="32"> Palo Alto Networks VM-Series Azure Deployment

This directory contains automation configurations for deploying and managing Palo Alto Networks VM-Series Firewalls in Azure.

## Directory Structure

```
palo_alto/
├── .logos/                    # Palo Alto Networks logos
├── vm_series/                 # VM-Series configurations
│   ├── terraform/            # Azure infrastructure deployment
│   │   ├── main.tf          # Main Terraform configuration
│   │   ├── variables.tf     # Variable definitions
│   │   └── README.md        # Terraform-specific documentation
│   └── ansible/             # VM-Series configuration management
│       ├── vm_series_config.yml  # Main Ansible playbook
│       ├── group_vars/      # Ansible variables
│       └── README.md        # Ansible-specific documentation
└── README.md                 # This file
```

## Quick Start

1. **Deploy Infrastructure**

   ```bash
   # Navigate to Terraform directory
   cd vm_series/terraform

   # Follow Terraform README for deployment
   ```

2. **Configure Firewall**

   ```bash
   # Navigate to Ansible directory
   cd ../ansible

   # Follow Ansible README for configuration
   ```

## Documentation

- [Terraform Configuration Guide](vm_series/terraform/README.md)

  - Azure infrastructure deployment
  - VM-Series sizing and licensing
  - Network design and security

- [Ansible Configuration Guide](vm_series/ansible/README.md)
  - Firewall configuration management
  - Security policies and rules
  - Interface and zone setup

## Support

For issues or questions:

1. Check the component-specific documentation
2. Review Azure documentation
3. Consult Palo Alto Networks documentation
4. Contact your Palo Alto Networks representative
