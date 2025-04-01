import axios from 'axios';
import {
  SecurityConfig,
  SecurityTemplate,
  SecurityValidation,
  SecurityEvent,
  CloudProvider,
  SecurityService,
  ComplianceStandard,
  SecurityStatus,
  DeploymentStatus,
  ComplianceStatus,
  ComplianceIssue,
  DashboardStats,
  CVE,
  CVEQuery,
  SecurityRecommendation
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ConfigTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  content: string;
  variables: string[];
  bestPractices: string[];
  lastUpdated: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  cloudProvider: string;
  securityService: string;
  usageCount: number;
  lastUpdated: string;
  tags: string[];
  configuration: Record<string, any>;
  createdBy: string;
  version: string;
}

// Security Configurations
export const getSecurityConfigs = async (): Promise<SecurityConfig[]> => {
  const response = await api.get('/security/configs');
  return response.data;
};

export const getSecurityConfig = async (id: string): Promise<SecurityConfig> => {
  const response = await api.get(`/security/configs/${id}`);
  return response.data;
};

export const createSecurityConfig = async (config: Partial<SecurityConfig>): Promise<SecurityConfig> => {
  const response = await api.post('/security/configs', config);
  return response.data;
};

export const updateSecurityConfig = async (id: string, config: Partial<SecurityConfig>): Promise<SecurityConfig> => {
  const response = await api.put(`/security/configs/${id}`, config);
  return response.data;
};

export const deleteSecurityConfig = async (id: string): Promise<void> => {
  await api.delete(`/security/configs/${id}`);
};

export const validateSecurityConfig = async (id: string): Promise<SecurityValidation> => {
  const response = await api.post(`/security/configs/${id}/validate`);
  return response.data;
};

export const deploySecurityConfig = async (id: string): Promise<{
  status: DeploymentStatus;
  message: string;
}> => {
  const response = await api.post(`/security/configs/${id}/deploy`);
  return response.data;
};

export const rollbackSecurityConfig = async (id: string, version: string): Promise<{
  status: DeploymentStatus;
  message: string;
}> => {
  const response = await api.post(`/security/configs/${id}/rollback`, { version });
  return response.data;
};

// Security Templates
export const getSecurityTemplates = async (): Promise<SecurityTemplate[]> => {
  const response = await api.get('/security/templates');
  return response.data;
};

export const getSecurityTemplate = async (id: string): Promise<SecurityTemplate> => {
  const response = await api.get(`/security/templates/${id}`);
  return response.data;
};

export const createSecurityTemplate = async (template: Partial<SecurityTemplate>): Promise<SecurityTemplate> => {
  const response = await api.post('/security/templates', template);
  return response.data;
};

// Helper function to calculate security score
export const calculateSecurityScore = (config: SecurityConfig): number => {
  let score = 100;
  
  // Deduct points for missing security features
  if (!config.threatPrevention.antivirus) score -= 10;
  if (!config.threatPrevention.antiSpyware) score -= 10;
  if (!config.threatPrevention.vulnerabilityProtection) score -= 10;
  if (!config.threatPrevention.urlFiltering) score -= 5;
  if (!config.threatPrevention.fileBlocking) score -= 5;
  if (!config.threatPrevention.dataFiltering) score -= 5;
  
  // Deduct points for missing logging
  if (!config.logging.trafficLogs) score -= 5;
  if (!config.logging.threatLogs) score -= 5;
  if (!config.logging.systemLogs) score -= 5;
  if (!config.logging.auditLogs) score -= 5;
  
  // Deduct points for compliance issues
  if (config.compliance.issues.length > 0) {
    score -= config.compliance.issues.length * 2;
  }
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
};

// Helper function to check compliance status
export const checkComplianceStatus = (config: SecurityConfig): SecurityStatus => {
  if (config.compliance.issues.length === 0) {
    return 'compliant';
  }
  
  const hasHighSeverityIssues = config.compliance.issues.some(issue => 
    issue.toLowerCase().includes('critical') || issue.toLowerCase().includes('high')
  );
  
  if (hasHighSeverityIssues) {
    return 'error';
  }
  
  return 'warning';
};

// Helper function to get deployment status color
export const getStatusColor = (status: DeploymentStatus): string => {
  switch (status) {
    case 'success':
      return 'green';
    case 'in_progress':
      return 'blue';
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
};

// CVE Management
export const searchCVE = async (query: CVEQuery): Promise<CVE[]> => {
  const response = await api.get('/cve/search', { params: query });
  return response.data;
};

export const getCVE = async (id: string): Promise<CVE> => {
  const response = await api.get(`/cve/${id}`);
  return response.data;
};

export const getCVEAlerts = async (): Promise<CVE[]> => {
  const response = await api.get('/cve/alerts');
  return response.data;
};

export const getCVERecommendations = async (cveId: string): Promise<{
  cveId: string;
  recommendations: SecurityRecommendation[];
}> => {
  const response = await api.get(`/cve/${cveId}/recommendations`);
  return response.data;
};

// Security Recommendations
export const getSecurityRecommendations = async (): Promise<SecurityRecommendation[]> => {
  try {
    const response = await api.get('/security-recommendations');
    return response.data;
  } catch (error) {
    console.error('Error fetching security recommendations:', error);
    throw error;
  }
};

// Dashboard Stats
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export const getConfigTemplates = async (): Promise<ConfigTemplate[]> => {
  try {
    const response = await api.get('/templates');
    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

export const getConfigTemplate = async (id: string): Promise<ConfigTemplate> => {
  try {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

export const updateConfigTemplate = async (id: string, data: Partial<ConfigTemplate>): Promise<ConfigTemplate> => {
  try {
    const response = await api.put(`/templates/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};

export const exportConfigTemplate = async (id: string, variables: Record<string, string>): Promise<string> => {
  try {
    const response = await api.post(`/templates/${id}/export`, { variables });
    return response.data;
  } catch (error) {
    console.error('Error exporting template:', error);
    throw error;
  }
};

export const getTemplates = async (): Promise<Template[]> => {
  const response = await fetch('/api/templates');
  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }
  return response.json();
};

// Compliance
export const getComplianceStatus = async (): Promise<ComplianceStatus> => {
  const response = await api.get('/compliance/status');
  return response.data;
};

export const getComplianceIssues = async (): Promise<ComplianceIssue[]> => {
  const response = await api.get('/compliance/issues');
  return response.data;
};

export default api; 