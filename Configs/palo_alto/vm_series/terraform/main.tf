terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    panos = {
      source  = "PaloAltoNetworks/panos"
      version = "~> 1.0"
    }
  }
}

# Provider configuration
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}

provider "panos" {
  hostname = var.panorama_hostname
  username = var.panorama_username
  password = var.panorama_password
}

# Resource Group
resource "azurerm_resource_group" "vm_series" {
  name     = "${var.firewall_name}-rg"
  location = var.location
}

# Network Security Group
resource "azurerm_network_security_group" "vm_series" {
  name                = "${var.firewall_name}-nsg"
  location            = azurerm_resource_group.vm_series.location
  resource_group_name = azurerm_resource_group.vm_series.name

  security_rule {
    name                       = "allow-https"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "allow-ssh"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Virtual Network
resource "azurerm_virtual_network" "vm_series" {
  name                = "${var.firewall_name}-vnet"
  location            = azurerm_resource_group.vm_series.location
  resource_group_name = azurerm_resource_group.vm_series.name
  address_space       = var.address_space
}

# Subnets
resource "azurerm_subnet" "trust" {
  name                 = "${var.firewall_name}-trust-subnet"
  resource_group_name  = azurerm_resource_group.vm_series.name
  virtual_network_name = azurerm_virtual_network.vm_series.name
  address_prefixes     = var.trust_subnet_prefixes
}

resource "azurerm_subnet" "untrust" {
  name                 = "${var.firewall_name}-untrust-subnet"
  resource_group_name  = azurerm_resource_group.vm_series.name
  virtual_network_name = azurerm_virtual_network.vm_series.name
  address_prefixes     = var.untrust_subnet_prefixes
}

# Network Interfaces
resource "azurerm_network_interface" "trust" {
  name                = "${var.firewall_name}-trust-nic"
  location            = azurerm_resource_group.vm_series.location
  resource_group_name = azurerm_resource_group.vm_series.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.trust.id
    private_ip_address_allocation = "Static"
    private_ip_address            = var.trust_private_ip
  }
}

resource "azurerm_network_interface" "untrust" {
  name                = "${var.firewall_name}-untrust-nic"
  location            = azurerm_resource_group.vm_series.name
  resource_group_name = azurerm_resource_group.vm_series.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.untrust.id
    private_ip_address_allocation = "Static"
    private_ip_address            = var.untrust_private_ip
  }
}

# Public IP for untrust interface
resource "azurerm_public_ip" "untrust" {
  name                = "${var.firewall_name}-untrust-pip"
  location            = azurerm_resource_group.vm_series.location
  resource_group_name = azurerm_resource_group.vm_series.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Associate public IP with untrust NIC
resource "azurerm_network_interface_ip_configuration" "untrust_pip" {
  name                          = "public"
  network_interface_id          = azurerm_network_interface.untrust.id
  subnet_id                     = azurerm_subnet.untrust.id
  private_ip_address_allocation = "Static"
  private_ip_address            = var.untrust_private_ip
  public_ip_address_id          = azurerm_public_ip.untrust.id
}

# VM-Series Firewall
resource "azurerm_virtual_machine" "vm_series" {
  name                  = var.firewall_name
  location              = azurerm_resource_group.vm_series.location
  resource_group_name   = azurerm_resource_group.vm_series.name
  network_interface_ids = [azurerm_network_interface.trust.id, azurerm_network_interface.untrust.id]
  vm_size              = var.vm_size

  storage_image_reference {
    publisher = "paloaltonetworks"
    offer     = "vmseries-flex"
    sku       = var.vm_series_sku
    version   = var.vm_series_version
  }

  storage_os_disk {
    name              = "${var.firewall_name}-osdisk"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
    disk_size_gb      = var.os_disk_size
  }

  os_profile {
    computer_name  = var.firewall_name
    admin_username = var.admin_username
    admin_password = var.admin_password
  }

  os_profile_linux_config {
    disable_password_authentication = false
  }

  tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}
