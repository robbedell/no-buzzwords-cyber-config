import { Request, Response } from 'express';

// Mock data for development (will be replaced with database data)
const mockComplianceStatus = {
  overallScore: 85,
  totalChecks: 20,
  passedChecks: 17,
  failedChecks: 3,
  issues: [
    {
      id: 'COMP-001',
      title: 'Missing Security Groups',
      severity: 'high',
      description: 'Some resources are not properly secured with security groups',
      status: 'open'
    },
    {
      id: 'COMP-002',
      title: 'Insufficient Logging',
      severity: 'medium',
      description: 'Logging configuration does not meet compliance requirements',
      status: 'in_progress'
    },
    {
      id: 'COMP-003',
      title: 'Outdated Security Policies',
      severity: 'low',
      description: 'Some security policies need to be updated to latest standards',
      status: 'open'
    }
  ]
};

export const getComplianceStatus = async (_req: Request, res: Response): Promise<void> => {
  try {
    // For now, return mock data
    // In the future, this will be replaced with database data
    res.json(mockComplianceStatus);
  } catch (error) {
    console.error('Error getting compliance status:', error);
    res.status(500).json({ error: 'Failed to fetch compliance status' });
  }
};

export const getComplianceIssues = async (_req: Request, res: Response): Promise<void> => {
  try {
    // For now, return mock data
    // In the future, this will be replaced with database data
    res.json(mockComplianceStatus.issues);
  } catch (error) {
    console.error('Error getting compliance issues:', error);
    res.status(500).json({ error: 'Failed to fetch compliance issues' });
  }
}; 