# Azure Authentication Variables
variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant ID"
  type        = string
}

variable "client_id" {
  description = "Azure client ID (service principal)"
  type        = string
}

variable "client_secret" {
  description = "Azure client secret (service principal)"
  type        = string
  sensitive   = true
}

# Resource Configuration Variables
variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "eastus"
}

variable "environment" {
  description = "Environment name (e.g., prod, dev, test)"
  type        = string
  default     = "prod"
}

variable "firewall_name" {
  description = "Name of the VM-Series firewall"
  type        = string
}

# VM-Series Configuration Variables
variable "vm_size" {
  description = "Azure VM size for VM-Series. Recommended sizes: Standard_D4s_v5 (4 vCPUs), Standard_D8s_v5 (8 vCPUs), Standard_D16s_v5 (16 vCPUs)"
  type        = string
  default     = "Standard_D4s_v5"
}

variable "vm_series_sku" {
  description = "SKU for VM-Series. Options: byol (Bring Your Own License), bundle1 (VM-Series Bundle 1), bundle2 (VM-Series Bundle 2)"
  type        = string
  default     = "byol"
}

variable "vm_series_version" {
  description = "Version of VM-Series to deploy. Use 'latest' for the most recent version, or specify a version number (e.g., '10.2.0')"
  type        = string
  default     = "latest"
}

variable "os_disk_size" {
  description = "Size of the OS disk in GB. Minimum recommended: 50GB"
  type        = number
  default     = 50
}

variable "admin_username" {
  description = "Admin username for the VM"
  type        = string
  default     = "admin"
}

variable "admin_password" {
  description = "Admin password for the VM"
  type        = string
  sensitive   = true
}

# Network Configuration Variables
variable "address_space" {
  description = "Address space for the virtual network"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "trust_subnet_prefixes" {
  description = "Address prefixes for the trust subnet"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "untrust_subnet_prefixes" {
  description = "Address prefixes for the untrust subnet"
  type        = list(string)
  default     = ["10.0.2.0/24"]
}

variable "trust_private_ip" {
  description = "Private IP address for the trust interface"
  type        = string
  default     = "10.0.1.4"
}

variable "untrust_private_ip" {
  description = "Private IP address for the untrust interface"
  type        = string
  default     = "10.0.2.4"
}
