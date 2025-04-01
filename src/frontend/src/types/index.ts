export type CloudProvider = 'azure' | 'aws' | 'gcp';
export type SecurityService = 'firewall' | 'security_group' | 'key_vault' | 'sentinel' | 'ngfw';
export type ComplianceStandard = 'cis' | 'nist' | 'pci' | 'hipaa' | 'custom';
export type SecurityStatus = 'compliant' | 'non_compliant' | 'warning' | 'error';
export type DeploymentStatus = 'success' | 'failed' | 'in_progress';

export interface SecurityZone {
  name: string;
  subnets: string[];
  securityLevel: number;
  description: string;
}

export interface SecurityPolicy {
  name: string;
  sourceZones: string[];
  destinationZones: string[];
  applications: string[];
  services: string[];
  action: 'allow' | 'deny';
  logging: boolean;
  description: string;
}

export interface NetworkZone {
  name: string;
  subnet: string;
  securityLevel: string;
}

export interface DeploymentHistoryEntry {
  timestamp: string;
  status: DeploymentStatus;
  changes: string[];
  user: string;
  version: string;
  notes?: string;
}

export interface ThreatPrevention {
  antivirus: boolean;
  antiSpyware: boolean;
  vulnerabilityProtection: boolean;
  urlFiltering: boolean;
  fileBlocking: boolean;
  dataFiltering: boolean;
}

export interface LoggingConfig {
  trafficLogs: boolean;
  threatLogs: boolean;
  systemLogs: boolean;
  auditLogs: boolean;
}

export interface ComplianceStatus {
  status: 'compliant' | 'non_compliant';
  issues: string[];
}

export interface SecurityConfig {
  id: string;
  name: string;
  description: string;
  cloudProvider: string;
  securityService: string;
  region: string;
  status: 'deployed' | 'pending_approval' | 'failed';
  lastUpdated: string;
  networkZones: NetworkZone[];
  threatPrevention: ThreatPrevention;
  logging: LoggingConfig;
  compliance: ComplianceStatus;
  deploymentHistory: DeploymentHistoryEntry[];
}

export interface SecurityTemplate {
  id: string;
  name: string;
  cloudProvider: CloudProvider;
  securityService: SecurityService;
  description: string;
  content: string;
  variables: {
    name: string;
    description: string;
    required: boolean;
    defaultValue?: string;
    validation?: {
      type: 'ip' | 'cidr' | 'port' | 'string';
      pattern?: string;
      min?: number;
      max?: number;
    };
  }[];
  bestPractices: {
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  compliance: {
    standards: ComplianceStandard[];
    requirements: string[];
  };
  lastUpdated: string;
}

export interface SecurityValidation {
  id: string;
  configId: string;
  timestamp: string;
  status: SecurityStatus;
  issues: {
    severity: 'high' | 'medium' | 'low';
    description: string;
    recommendation: string;
    affectedComponents: string[];
  }[];
  compliance: {
    standard: ComplianceStandard;
    status: SecurityStatus;
    requirements: {
      id: string;
      description: string;
      status: SecurityStatus;
      details?: string;
    }[];
  }[];
  securityScore: number;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'alert' | 'incident' | 'compliance' | 'deployment';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedConfigs: string[];
  status: 'open' | 'in_progress' | 'resolved';
  resolution?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'security' | 'operator' | 'viewer';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
}

export interface CVE {
  id: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  publishedDate: string;
  affectedProducts: string[];
  recommendedConfigs: string[];
}

export interface SecurityRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
}

export interface DashboardStats {
  overallSecurityScore: number;
  criticalVulnerabilities: number;
  pendingUpdates: number;
  compliantConfigs: number;
  recentEvents: SecurityEvent[];
}

export interface ConfigTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  content: string;
  variables: {
    name: string;
    description: string;
    required: boolean;
  }[];
  bestPractices: string[];
  lastUpdated: string;
}

export interface CVEQuery {
  query: string;
}

export interface TemplateVariables {
  [key: string]: string;
}

export * from './security';
export * from './cve';
export * from './dashboard';
export * from './compliance'; 