import { CloudProvider, SecurityService, SecurityStatus, ComplianceStandard } from './shared';

export interface DashboardStats {
  totalConfigs: number;
  activeConfigs: number;
  pendingDeployments: number;
  failedDeployments: number;
  complianceScore: number;
  recentActivity: {
    id: string;
    type: 'deployment' | 'update' | 'validation';
    timestamp: string;
    status: 'success' | 'failed' | 'in_progress';
    details: string;
  }[];
  configDistribution: {
    cloudProvider: CloudProvider;
    count: number;
  }[];
  serviceDistribution: {
    service: SecurityService;
    count: number;
  }[];
  complianceIssues: {
    standard: ComplianceStandard;
    count: number;
    severity: 'high' | 'medium' | 'low';
  }[];
} 