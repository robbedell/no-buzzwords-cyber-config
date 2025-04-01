import { Request, Response } from 'express';
import { CVEQuery, SecurityRecommendation } from '../types';
import { CVEModel } from '../models/CVE';

// Mock data for development (will be replaced with database data)
const mockRecommendations: SecurityRecommendation[] = [
  {
    id: 'REC-001',
    type: 'palo_alto',
    title: 'Enable Threat Prevention',
    description: 'Enable threat prevention features to protect against known threats',
    priority: 'high',
    relatedCVEs: ['CVE-2024-0001'],
    config: 'set security profiles threat-prevention enabled yes',
    bestPractices: [
      'Enable all threat prevention features',
      'Configure appropriate action profiles',
      'Monitor logs for false positives'
    ]
  }
];

export const searchCVE = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      query,
      cveId,
      product,
      description: descriptionQuery,
      severity
    } = req.query as CVEQuery;
    
    // Build MongoDB query
    const mongoQuery: any = {};
    
    if (query) {
      mongoQuery.$or = [
        { id: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (cveId) {
      mongoQuery.id = cveId;
    }
    
    if (product) {
      mongoQuery.affectedProducts = { $regex: product, $options: 'i' };
    }
    
    if (descriptionQuery) {
      mongoQuery.description = { $regex: descriptionQuery, $options: 'i' };
    }
    
    if (severity) {
      mongoQuery.severity = severity;
    }
    
    const cves = await CVEModel.find(mongoQuery);
    res.json(cves);
  } catch (error) {
    console.error('Error searching CVEs:', error);
    res.status(500).json({ error: 'Failed to search CVEs' });
  }
};

export const getCVE = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cve = await CVEModel.findOne({ id });
    
    if (!cve) {
      res.status(404).json({ error: 'CVE not found' });
      return;
    }
    
    res.json(cve);
  } catch (error) {
    console.error('Error getting CVE:', error);
    res.status(500).json({ error: 'Failed to get CVE' });
  }
};

export const getCVERecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cve = await CVEModel.findOne({ id });
    
    if (!cve) {
      res.status(404).json({ error: 'CVE not found' });
      return;
    }
    
    res.json({ recommendations: cve.recommendedConfigs });
  } catch (error) {
    console.error('Error getting CVE recommendations:', error);
    res.status(500).json({ error: 'Failed to get CVE recommendations' });
  }
};

export const getSecurityRecommendations = async (_req: Request, res: Response): Promise<void> => {
  try {
    // For now, return mock recommendations
    // In the future, this will be replaced with database data
    res.json(mockRecommendations);
  } catch (error) {
    console.error('Error getting security recommendations:', error);
    res.status(500).json({ error: 'Failed to get security recommendations' });
  }
};

export const getCVEAlerts = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get high severity CVEs from the database
    const alerts = await CVEModel.find({ severity: 'high' });
    res.json(alerts);
  } catch (error) {
    console.error('Error getting CVE alerts:', error);
    res.status(500).json({ error: 'Failed to fetch CVE alerts' });
  }
}; 