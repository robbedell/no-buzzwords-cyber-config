import { ComplianceStandard } from './security';

export interface ComplianceStatus {
  overallScore: number;
  standards: {
    standard: ComplianceStandard;
    score: number;
    status: 'compliant' | 'partially_compliant' | 'non_compliant';
    lastAssessment: string;
  }[];
  recentChanges: {
    standard: ComplianceStandard;
    change: 'improvement' | 'deterioration';
    timestamp: string;
    details: string;
  }[];
}

export interface ComplianceIssue {
  id: string;
  standard: ComplianceStandard;
  severity: 'high' | 'medium' | 'low';
  description: string;
  affectedResources: string[];
  remediation: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
} 