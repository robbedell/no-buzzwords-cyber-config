# <img src="../../.logos/palo_alto.svg" alt="Palo Alto Networks Logo" width="32" height="32"> VM-Series Configuration - Ansible

This directory contains Ansible playbooks and configurations for managing Palo Alto Networks VM-Series Firewalls.

## Required VM-Series Configurations

### 1. System Configuration

- Hostname and Domain
- NTP Settings
- DNS Settings
- Management Interface
- System Logging

### 2. Network Configuration

- Interface Settings
  - Trust Interface
  - Untrust Interface
  - Management Interface
- Security Zones
- Virtual Routers
- Static Routes

### 3. Security Configuration

- Security Rules
- NAT Rules
- Application Signatures
- Threat Prevention
- URL Filtering

### 4. High Availability (if applicable)

- HA Configuration
- State Synchronization
- Active/Passive Settings
- Floating IP Addresses

## Quick Start

1. **Prerequisites**

   ```bash
   # Install Ansible
   brew install ansible

   # Install Palo Alto Networks Ansible modules
   pip install pan-os-ansible
   ```

2. **Configure Inventory**

   ```bash
   # Create inventory file
   cp inventory.example inventory
   ```

3. **Configure Variables**

   ```bash
   # Create group_vars file
   cp group_vars/vm_series.example group_vars/vm_series.yml
   ```

4. **Run Playbook**
   ```bash
   # Run the configuration playbook
   ansible-playbook -i inventory vm_series_config.yml
   ```

## Configuration Guide

### 1. Inventory Configuration

Create an `inventory` file with your VM-Series firewalls:

```ini
[vm_series]
panfw-prod-01 ansible_host=10.0.2.4
panfw-prod-02 ansible_host=10.0.2.5

[vm_series:vars]
ansible_connection=local
ansible_python_interpreter=/usr/bin/python3
```

### 2. Variable Configuration

Configure the VM-Series settings in `group_vars/vm_series.yml`:

```yaml
# System Configuration
system:
  hostname: "panfw-prod-01"
  domain: "example.com"
  ntp_servers:
    - "pool.ntp.org"
  dns_servers:
    - "8.8.8.8"
    - "8.8.4.4"
  logging:
    syslog_servers:
      - "10.0.1.100"
    log_retention: 30

# Interface Configuration
interfaces:
  - name: ethernet1/1
    mode: layer3
    ip: ["10.0.1.4/24"]
    management_profile: allow-ping
    zone: trust
    comment: "Internal Network"

  - name: ethernet1/2
    mode: layer3
    ip: ["10.0.2.4/24"]
    management_profile: allow-ping
    zone: untrust
    comment: "External Network"

  - name: ethernet1/3
    mode: layer3
    ip: ["10.0.3.4/24"]
    management_profile: allow-ping
    zone: management
    comment: "Management Network"

# Security Zone Configuration
security_zones:
  - name: trust
    zone_profile: default
    log_setting: default
    enable_userid: true
    comment: "Internal Network Zone"

  - name: untrust
    zone_profile: default
    log_setting: default
    enable_userid: true
    comment: "External Network Zone"

  - name: management
    zone_profile: default
    log_setting: default
    enable_userid: false
    comment: "Management Network Zone"

# Virtual Router Configuration
virtual_routers:
  - name: default
    interfaces:
      - ethernet1/1
      - ethernet1/2
    static_routes:
      - name: "default-route"
        destination: "0.0.0.0/0"
        interface: "ethernet1/2"
        next_hop: "10.0.2.1"

# Security Rules
security_rules:
  - name: allow-internal
    source_zone: trust
    destination_zone: untrust
    source_ip: ["10.0.1.0/24"]
    destination_ip: ["any"]
    application: ["any"]
    service: ["application-default"]
    action: allow
    log_setting: default
    comment: "Allow internal to external"

  - name: deny-all
    source_zone: ["any"]
    destination_zone: ["any"]
    source_ip: ["any"]
    destination_ip: ["any"]
    application: ["any"]
    service: ["any"]
    action: deny
    log_setting: default
    comment: "Deny all other traffic"

# NAT Rules
nat_rules:
  - name: source-nat
    source_zone: trust
    destination_zone: untrust
    source_ip: ["10.0.1.0/24"]
    destination_ip: ["any"]
    service: ["any"]
    nat_type: ipv4
    source_translation_type: dynamic-ip-and-port
    source_translation_address_type: interface-address
    source_translation_interface: ethernet1/2
    comment: "Source NAT for internal users"

# High Availability Configuration (if applicable)
ha:
  enabled: true
  peer_ha1_ip: "10.0.3.5"
  peer_ha2_ip: "10.0.3.6"
  ha1_ip: "10.0.3.4"
  ha2_ip: "10.0.3.7"
  ha1_port: "ethernet1/3"
  ha2_port: "ethernet1/4"
  state_sync_port: "ethernet1/3"
  passive_link_state: "shutdown"
```

## Detailed Configuration Guide

### Interface Configuration

1. **Layer 3 Mode**

   - Purpose: Standard routing mode
   - Use for: Most common deployment scenarios
   - Configuration:
     ```yaml
     mode: layer3
     ip: ["10.0.1.4/24"]
     management_profile: allow-ping
     ```
   - Best Practices:
     - Use static IP addresses
     - Enable management profiles
     - Configure proper security zones

2. **Layer 2 Mode**

   - Purpose: Transparent mode
   - Use for: Inline deployment scenarios
   - Configuration:
     ```yaml
     mode: layer2
     management_profile: allow-ping
     ```
   - Best Practices:
     - Configure VLANs if needed
     - Set up proper security zones
     - Enable management profiles

3. **Virtual Wire Mode**
   - Purpose: Transparent mode with VLAN support
   - Use for: Complex network scenarios
   - Configuration:
     ```yaml
     mode: virtual-wire
     management_profile: allow-ping
     ```
   - Best Practices:
     - Configure VLANs
     - Set up proper security zones
     - Enable management profiles

### Security Zone Configuration

1. **Trust Zone**

   - Purpose: Internal network
   - Configuration:
     ```yaml
     name: trust
     zone_profile: default
     log_setting: default
     enable_userid: true
     ```
   - Best Practices:
     - Enable User-ID
     - Configure logging
     - Set up proper security rules

2. **Untrust Zone**

   - Purpose: External network
   - Configuration:
     ```yaml
     name: untrust
     zone_profile: default
     log_setting: default
     enable_userid: true
     ```
   - Best Practices:
     - Enable User-ID
     - Configure logging
     - Set up proper security rules

3. **Management Zone**
   - Purpose: Administrative access
   - Configuration:
     ```yaml
     name: management
     zone_profile: default
     log_setting: default
     enable_userid: false
     ```
   - Best Practices:
     - Restrict access
     - Enable logging
     - Use strong authentication

### Security Rules

1. **Basic Rules**

   ```yaml
   - name: allow-internal
     source_zone: trust
     destination_zone: untrust
     source_ip: ["10.0.1.0/24"]
     destination_ip: ["any"]
     application: ["any"]
     service: ["application-default"]
     action: allow
   ```

   - Best Practices:
     - Use specific applications
     - Configure logging
     - Add comments

2. **Advanced Rules**
   ```yaml
   - name: web-access
     source_zone: untrust
     destination_zone: trust
     source_ip: ["any"]
     destination_ip: ["10.0.1.10"]
     application: ["web-browsing"]
     service: ["application-default"]
     action: allow
     log_setting: detailed
   ```
   - Best Practices:
     - Use specific applications
     - Configure detailed logging
     - Add comments
     - Consider security profiles

### NAT Rules

1. **Source NAT**

   ```yaml
   - name: source-nat
     source_zone: trust
     destination_zone: untrust
     source_ip: ["10.0.1.0/24"]
     destination_ip: ["any"]
     service: ["any"]
     nat_type: ipv4
     source_translation_type: dynamic-ip-and-port
   ```

   - Best Practices:
     - Use specific services
     - Configure logging
     - Add comments

2. **Destination NAT**
   ```yaml
   - name: web-server
     source_zone: untrust
     destination_zone: trust
     source_ip: ["any"]
     destination_ip: ["10.0.2.10"]
     service: ["tcp/80", "tcp/443"]
     nat_type: ipv4
     destination_translation_address: "10.0.1.10"
   ```
   - Best Practices:
     - Use specific services
     - Configure logging
     - Add comments
     - Consider security profiles

## Security Best Practices

### VM-Series Security

1. **Access Control**

   - Strong password policies
   - HTTPS for management
   - IP-based access restrictions
   - Regular password rotation
   - Best Practices:
     - Use complex passwords
     - Enable MFA if available
     - Restrict management access
     - Regular password rotation

2. **Network Security**

   - Proper security zones
   - Strict security rules
   - Regular rule audits
   - Logging and monitoring
   - Best Practices:
     - Use security profiles
     - Enable threat prevention
     - Configure logging
     - Regular audits

3. **Maintenance**
   - Regular updates
   - Security patches
   - Configuration backups
   - Performance monitoring
   - Best Practices:
     - Schedule updates
     - Test patches
     - Regular backups
     - Monitor performance

## Troubleshooting Guide

### Common Issues

1. **Connection Issues**

   ```bash
   # Test connectivity
   ping <firewall_ip>

   # Check SSH access
   ssh admin@<firewall_ip>

   # Verify Ansible connection
   ansible -i inventory vm_series -m ping
   ```

2. **Configuration Issues**

   ```bash
   # Check playbook syntax
   ansible-playbook -i inventory vm_series_config.yml --syntax-check

   # Run in check mode
   ansible-playbook -i inventory vm_series_config.yml --check

   # Run with increased verbosity
   ansible-playbook -i inventory vm_series_config.yml -vvv
   ```

3. **Module Issues**

   ```bash
   # Verify module installation
   pip show pan-os-ansible

   # Update modules
   pip install --upgrade pan-os-ansible
   ```

### Useful Commands

```bash
# Run specific tasks
ansible-playbook -i inventory vm_series_config.yml --tags "interfaces"

# Run against specific host
ansible-playbook -i inventory vm_series_config.yml --limit panfw-prod-01

# Generate diff
ansible-playbook -i inventory vm_series_config.yml --diff
```

## Support

For issues or questions:

1. Check the troubleshooting guide
2. Review Ansible documentation
3. Consult Palo Alto Networks documentation
4. Contact your Palo Alto Networks representative
