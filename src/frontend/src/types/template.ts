import { CloudProvider, SecurityService } from './shared';

export interface Template {
  id: string;
  name: string;
  description: string;
  cloudProvider: CloudProvider;
  securityService: SecurityService;
  usageCount: number;
  lastUpdated: string;
  tags: string[];
  configuration: Record<string, any>;
  createdBy: string;
  version: string;
  variables: string[];
  bestPractices: string[];
} 