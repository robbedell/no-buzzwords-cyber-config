# <img src="../../.logos/palo_alto.svg" alt="Palo Alto Networks Logo" width="32" height="32"> VM-Series Azure Deployment - Terraform

This directory contains the Terraform configuration for deploying Palo Alto Networks VM-Series Firewalls in Azure.

## Required Azure Resources

### 1. Resource Group

- Purpose: Logical container for all VM-Series resources
- Location: Azure region where resources will be deployed
- Naming Convention: `rg-pan-{environment}-{region}`

### 2. Virtual Network

- Purpose: Network isolation and routing
- Address Space: Must be unique and non-overlapping
- Subnets:
  - Trust (Internal): For protected resources
  - Untrust (External): For internet-facing traffic
  - Management: For administrative access (optional)

### 3. Network Security Groups

- Purpose: Control traffic flow between subnets
- Required Rules:
  - Management: Allow HTTPS (443) from trusted IPs
  - Trust: Allow internal traffic
  - Untrust: Allow internet traffic

### 4. Public IP Addresses

- Purpose: External access for Untrust interface
- SKU: Standard (required for VM-Series)
- Allocation: Static

### 5. Network Interfaces

- Purpose: VM-Series network connectivity
- Required Interfaces:
  - Trust: Internal network
  - Untrust: External network
  - Management: Administrative access

### 6. Storage Account

- Purpose: Boot diagnostics and logging
- SKU: Standard_LRS
- Performance: Standard

## Quick Start

1. **Prerequisites**

   ```bash
   # Install Azure CLI
   brew install azure-cli

   # Install Terraform
   brew install terraform

   # Login to Azure
   az login
   ```

2. **Create Service Principal**

   ```bash
   # Create service principal with required permissions
   az ad sp create-for-rbac --name "vm-series-deployer" --role Contributor
   ```

3. **Configure Deployment**

   ```bash
   # Create terraform.tfvars with your settings
   cp terraform.tfvars.example terraform.tfvars
   ```

4. **Deploy**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

## Configuration Guide

### 1. Azure Authentication

Create a `terraform.tfvars` file with your Azure credentials:

```hcl
# Required Azure credentials
subscription_id = "your-subscription-id"  # Azure subscription ID
tenant_id       = "your-tenant-id"        # Azure tenant ID
client_id       = "your-client-id"        # Service principal client ID
client_secret   = "your-client-secret"    # Service principal secret
```

### 2. Resource Configuration

Configure basic resource settings:

```hcl
# Resource location and naming
location     = "eastus"                    # Azure region
environment  = "prod"                      # Environment name (prod, dev, test)
firewall_name = "panfw-prod-01"           # Name of the VM-Series firewall

# Resource naming
resource_group_name = "rg-pan-prod-eastus"  # Resource group name
vnet_name = "vnet-pan-prod-eastus"          # Virtual network name
nsg_name = "nsg-pan-prod-eastus"            # Network security group name
```

### 3. VM-Series Configuration

Configure the VM-Series firewall settings:

```hcl
# VM-Series deployment settings
vm_size = "Standard_D4s_v5"               # VM size (see VM Size Guide below)
vm_series_sku = "byol"                    # License type (byol, bundle1, bundle2)
vm_series_version = "latest"              # VM-Series version
os_disk_size = 50                         # OS disk size in GB
admin_username = "admin"                  # Admin username
admin_password = "your-secure-password"   # Admin password

# Availability settings
availability_set_name = "avset-pan-prod"  # Availability set name
availability_zones = ["1", "2", "3"]      # Availability zones for HA
```

### 4. Network Configuration

Configure networking settings:

```hcl
# Virtual Network settings
address_space = ["10.0.0.0/16"]           # VNet address space

# Trust subnet (internal network)
trust_subnet_prefixes = ["10.0.1.0/24"]   # Trust subnet CIDR
trust_private_ip = "10.0.1.4"             # Trust interface IP

# Untrust subnet (external network)
untrust_subnet_prefixes = ["10.0.2.0/24"] # Untrust subnet CIDR
untrust_private_ip = "10.0.2.4"           # Untrust interface IP

# Management subnet (optional)
management_subnet_prefixes = ["10.0.3.0/24"] # Management subnet CIDR
management_private_ip = "10.0.3.4"           # Management interface IP
```

### 5. Security Configuration

Configure security settings:

```hcl
# Network Security Group rules
nsg_rules = {
  management = [
    {
      name = "allow-https"
      priority = 100
      direction = "Inbound"
      access = "Allow"
      protocol = "Tcp"
      source_port_range = "*"
      destination_port_range = "443"
      source_address_prefix = "YOUR_TRUSTED_IP"
      destination_address_prefix = "*"
    }
  ],
  trust = [
    {
      name = "allow-internal"
      priority = 100
      direction = "Inbound"
      access = "Allow"
      protocol = "*"
      source_port_range = "*"
      destination_port_range = "*"
      source_address_prefix = "10.0.1.0/24"
      destination_address_prefix = "*"
    }
  ],
  untrust = [
    {
      name = "allow-internet"
      priority = 100
      direction = "Inbound"
      access = "Allow"
      protocol = "*"
      source_port_range = "*"
      destination_port_range = "*"
      source_address_prefix = "*"
      destination_address_prefix = "*"
    }
  ]
}
```

## Detailed Configuration Guide

### VM Size Guide

Choose the appropriate VM size based on your requirements:

1. **Standard_D4s_v5** (Default)

   - 4 vCPUs
   - 16 GB RAM
   - Recommended for:
     - Small to medium workloads
     - Up to 1 Gbps throughput
     - Development environments
     - Testing environments

2. **Standard_D8s_v5**

   - 8 vCPUs
   - 32 GB RAM
   - Recommended for:
     - Medium to large workloads
     - Up to 2 Gbps throughput
     - Production environments
     - High-availability setups

3. **Standard_D16s_v5**
   - 16 vCPUs
   - 64 GB RAM
   - Recommended for:
     - Large workloads
     - Up to 4 Gbps throughput
     - Enterprise deployments
     - High-performance requirements

### License Options

1. **BYOL (Bring Your Own License)**

   - Use your existing VM-Series license
   - Most flexible option
   - Recommended for:
     - Existing deployments
     - Custom licensing requirements
     - Cost optimization

2. **Bundle1**

   - Includes VM-Series license
   - Basic security features
   - Recommended for:
     - Standard deployments
     - Basic security requirements
     - Cost-effective solutions

3. **Bundle2**
   - Includes VM-Series license
   - Advanced security features
   - Recommended for:
     - High-security requirements
     - Advanced threat prevention
     - Enterprise deployments

### Network Design Guide

1. **Trust Subnet (Internal)**

   - Purpose: Internal network traffic
   - Recommended CIDR: /24 or smaller
   - Example: 10.0.1.0/24
   - IP Assignment: Static IP recommended
   - Azure Location: Azure Portal > Virtual Networks > Your VNet > Subnets

2. **Untrust Subnet (External)**

   - Purpose: Internet-facing traffic
   - Recommended CIDR: /24 or smaller
   - Example: 10.0.2.0/24
   - IP Assignment: Static IP required
   - Azure Location: Azure Portal > Virtual Networks > Your VNet > Subnets

3. **Management Subnet (Optional)**

   - Purpose: Administrative access
   - Recommended CIDR: /24 or smaller
   - Example: 10.0.3.0/24
   - IP Assignment: Static IP recommended
   - Azure Location: Azure Portal > Virtual Networks > Your VNet > Subnets

4. **Address Space Planning**
   - Ensure no overlap with existing networks
   - Plan for future expansion
   - Consider VPN requirements
   - Account for Azure reserved IPs
   - Azure Location: Azure Portal > Virtual Networks > Your VNet > Address space

## Security Best Practices

### Azure Security

1. **Service Principal**

   - Use least privilege principle
   - Regular rotation of credentials
   - Monitor usage and access
   - Azure Location: Azure Portal > Azure Active Directory > App registrations

2. **Network Security**

   - Use Network Security Groups
   - Implement proper subnet isolation
   - Enable Azure Monitor
   - Use Azure Key Vault for secrets
   - Azure Location: Azure Portal > Network security groups

3. **Monitoring**
   - Enable Azure Monitor
   - Set up alerts
   - Configure logging
   - Regular security audits
   - Azure Location: Azure Portal > Monitor

### VM-Series Security

1. **Access Control**

   - Strong password policies
   - HTTPS for management
   - IP-based access restrictions
   - Regular password rotation
   - Azure Location: Azure Portal > Virtual Machines > Your VM > Networking

2. **Network Security**

   - Proper security zones
   - Strict security rules
   - Regular rule audits
   - Logging and monitoring
   - Azure Location: Azure Portal > Network security groups

3. **Maintenance**
   - Regular updates
   - Security patches
   - Configuration backups
   - Performance monitoring
   - Azure Location: Azure Portal > Virtual Machines > Your VM > Maintenance

## Troubleshooting Guide

### Common Issues

1. **Deployment Failures**

   ```bash
   # Check Azure connectivity
   az account show

   # Verify service principal permissions
   az role assignment list --assignee <client_id>

   # Check resource group
   az group show --name <resource-group>
   ```

2. **Network Issues**

   ```bash
   # Verify VNet configuration
   az network vnet show --name <vnet-name>

   # Check subnet configuration
   az network vnet subnet show --name <subnet-name>

   # Verify NSG rules
   az network nsg rule list --nsg-name <nsg-name>
   ```

3. **VM-Series Issues**

   ```bash
   # Check VM status
   az vm show --name <vm-name>

   # View VM logs
   az vm boot-diagnostics get-boot-log --name <vm-name>

   # Check network interfaces
   az network nic show --name <nic-name>
   ```

### Useful Commands

```bash
# Resource Group Operations
az group create --name <name> --location <location>
az group delete --name <name>

# Network Operations
az network vnet create --name <name> --resource-group <group>
az network nsg create --name <name> --resource-group <group>

# VM Operations
az vm start --name <name> --resource-group <group>
az vm stop --name <name> --resource-group <group>
az vm deallocate --name <name> --resource-group <group>
```

## Support

For issues or questions:

1. Check the troubleshooting guide
2. Review Azure documentation
3. Consult Palo Alto Networks documentation
4. Contact your Palo Alto Networks representative
