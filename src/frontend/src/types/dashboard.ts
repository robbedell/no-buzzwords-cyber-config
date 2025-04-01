import { CVE } from './cve';
import { SecurityRecommendation } from './security';

export interface DashboardStats {
  securityScore: number;
  highSeverityCVEs: number;
  pendingUpdates: number;
  protectedAssets: number;
  recentCVEs: CVE[];
  recommendations: SecurityRecommendation[];
  totalConfigs: number;
  activeConfigs: number;
  pendingDeployments: number;
  failedDeployments: number;
  complianceScore: number;
  recentActivity: {
    id: string;
    type: string;
    timestamp: string;
    status: string;
    details: string;
  }[];
  configDistribution: {
    cloudProvider: string;
    count: number;
  }[];
  serviceDistribution: {
    service: string;
    count: number;
  }[];
  complianceIssues: {
    standard: string;
    count: number;
    severity: string;
  }[];
} 