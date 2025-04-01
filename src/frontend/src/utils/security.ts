import { SecurityConfig, ComplianceStandard } from '../types/security';

export const calculateSecurityScore = (config: SecurityConfig): number => {
  let score = 100;
  
  // Deduct points for missing or disabled features
  if (!config.threatPrevention.enabled) {
    score -= 20;
  }
  if (!config.logging.enabled) {
    score -= 15;
  }
  
  // Deduct points for compliance issues
  if (config.complianceStatus.issues.length > 0) {
    config.complianceStatus.issues.forEach(issue => {
      switch (issue.severity) {
        case 'high':
          score -= 10;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 2;
          break;
      }
    });
  }
  
  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
};

export const checkComplianceStatus = (config: SecurityConfig, standard: ComplianceStandard): {
  isCompliant: boolean;
  issues: {
    field: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
  }[];
} => {
  const issues: {
    field: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
  }[] = [];

  // Check threat prevention
  if (!config.threatPrevention.enabled) {
    issues.push({
      field: 'threatPrevention',
      message: 'Threat prevention is disabled',
      severity: 'high'
    });
  }

  // Check logging
  if (!config.logging.enabled) {
    issues.push({
      field: 'logging',
      message: 'Logging is disabled',
      severity: 'medium'
    });
  }

  // Check network zones
  if (config.networkZones.length === 0) {
    issues.push({
      field: 'networkZones',
      message: 'No network zones defined',
      severity: 'high'
    });
  }

  // Check compliance with specific standards
  switch (standard) {
    case 'cis':
      // Add CIS-specific checks
      break;
    case 'nist':
      // Add NIST-specific checks
      break;
    case 'pci':
      // Add PCI-specific checks
      break;
    case 'hipaa':
      // Add HIPAA-specific checks
      break;
  }

  return {
    isCompliant: issues.length === 0,
    issues
  };
}; 