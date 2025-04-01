export type CloudProvider = 'aws' | 'azure' | 'gcp';
export type SecurityService = 'firewall' | 'security_group' | 'waf' | 'ddos_protection';
export type ComplianceStandard = 'cis' | 'nist' | 'pci' | 'hipaa';
export type SecurityStatus = 'active' | 'inactive' | 'pending';
export type DeploymentStatus = 'success' | 'failed' | 'in_progress';

export interface NetworkZone {
  name: string;
  cidr: string;
  description?: string;
}

export interface SecurityConfig {
  id: string;
  name: string;
  description: string;
  cloudProvider: CloudProvider;
  securityService: SecurityService;
  region: string;
  networkZones: NetworkZone[];
  threatPrevention: {
    enabled: boolean;
    rules: {
      name: string;
      action: 'allow' | 'deny';
      source: string;
      destination: string;
      protocol: string;
      port: string;
    }[];
  };
  logging: {
    enabled: boolean;
    level: 'info' | 'warning' | 'error';
    retention: number;
  };
  status: SecurityStatus;
  lastUpdated: string;
  createdBy: string;
  deploymentHistory: DeploymentHistoryEntry[];
  complianceStatus: {
    isCompliant: boolean;
    issues: {
      standard: ComplianceStandard;
      description: string;
      severity: 'high' | 'medium' | 'low';
    }[];
  };
}

export interface DeploymentHistoryEntry {
  version: string;
  timestamp: string;
  status: DeploymentStatus;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

export interface SecurityRecommendation {
  id: string;
  type: 'palo_alto' | 'terraform' | 'ansible';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  relatedCVEs: string[];
  config: string;
  bestPractices: string[];
} 