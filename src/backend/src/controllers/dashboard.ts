import { Request, Response } from 'express';
import { DashboardStats } from '../types';
import { DashboardStatsModel } from '../models/Dashboard';

// Initial dashboard stats
const initialStats: DashboardStats = {
  securityScore: 100,
  highSeverityCVEs: 0,
  pendingUpdates: 0,
  protectedAssets: 0,
  recentCVEs: [],
  recommendations: [],
  totalConfigs: 0,
  activeConfigs: 0,
  pendingDeployments: 0,
  failedDeployments: 0,
  complianceScore: 100,
  recentActivity: [],
  configDistribution: [
    { cloudProvider: 'aws', count: 0 },
    { cloudProvider: 'azure', count: 0 },
    { cloudProvider: 'gcp', count: 0 }
  ],
  serviceDistribution: [
    { service: 'firewall', count: 0 },
    { service: 'security_group', count: 0 },
    { service: 'waf', count: 0 },
    { service: 'ddos_protection', count: 0 }
  ],
  complianceIssues: []
};

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get the latest dashboard stats
    const stats = await DashboardStatsModel.findOne()
      .sort({ updatedAt: -1 })
      .limit(1);

    if (!stats) {
      // If no stats exist, create initial stats
      const newStats = await DashboardStatsModel.create(initialStats);
      res.json(newStats);
      return;
    }

    res.json(stats);
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
}; 