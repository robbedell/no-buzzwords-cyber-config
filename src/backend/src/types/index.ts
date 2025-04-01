import { 
  CVE, 
  CVEQuery, 
  SecurityRecommendation 
} from '../../../frontend/src/types/cve';

import {
  CloudProvider,
  SecurityService,
  ComplianceStandard,
  SecurityStatus,
  DeploymentStatus,
  NetworkZone,
  SecurityConfig,
  DeploymentHistoryEntry
} from '../../../frontend/src/types/security';

import { DashboardStats } from '../../../frontend/src/types/dashboard';
import { ComplianceStatus, ComplianceIssue } from '../../../frontend/src/types/compliance';

export {
  CVE,
  CVEQuery,
  SecurityRecommendation,
  CloudProvider,
  SecurityService,
  ComplianceStandard,
  SecurityStatus,
  DeploymentStatus,
  NetworkZone,
  SecurityConfig,
  DeploymentHistoryEntry,
  DashboardStats,
  ComplianceStatus,
  ComplianceIssue
};

// Additional backend-specific types
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
  logRetention: number; // days
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