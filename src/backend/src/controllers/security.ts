import { Request, Response } from 'express';
import { SecurityConfig } from '../types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

// Mock data for development
const securityConfigs: SecurityConfig[] = [
  {
    id: '1',
    name: 'Production Firewall',
    description: 'Production firewall configuration',
    cloudProvider: 'azure',
    securityService: 'firewall',
    region: 'eastus',
    networkZones: [
      {
        name: 'trust',
        cidr: '10.0.1.0/24',
        description: 'Internal trusted network'
      },
      {
        name: 'untrust',
        cidr: '10.0.2.0/24',
        description: 'External untrusted network'
      }
    ],
    threatPrevention: {
      enabled: true,
      rules: [
        {
          name: 'Web Access',
          action: 'allow',
          source: 'trust',
          destination: 'untrust',
          protocol: 'tcp',
          port: '443'
        }
      ]
    },
    logging: {
      enabled: true,
      level: 'info',
      retention: 30
    },
    status: 'active',
    lastUpdated: new Date().toISOString(),
    createdBy: 'admin',
    deploymentHistory: [
      {
        version: '1.0',
        timestamp: new Date().toISOString(),
        status: 'success',
        changes: [
          {
            field: 'status',
            oldValue: null,
            newValue: 'active'
          }
        ]
      }
    ],
    complianceStatus: {
      isCompliant: true,
      issues: []
    }
  }
];

// Controllers
export const getSecurityConfigs = async (req: Request, res: Response) => {
  try {
    const { cloudProvider, securityService, status } = req.query;
    let filteredConfigs = [...securityConfigs];

    if (cloudProvider) {
      filteredConfigs = filteredConfigs.filter(
        config => config.cloudProvider === cloudProvider
      );
    }

    if (securityService) {
      filteredConfigs = filteredConfigs.filter(
        config => config.securityService === securityService
      );
    }

    if (status) {
      filteredConfigs = filteredConfigs.filter(
        config => config.status === status
      );
    }

    res.json(filteredConfigs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security configurations' });
  }
};

export const getSecurityConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const config = securityConfigs.find(c => c.id === id);

    if (!config) {
      res.status(404).json({ error: 'Security configuration not found' });
      return;
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security configuration' });
  }
};

export const createSecurityConfig = async (req: Request, res: Response) => {
  try {
    const newConfig: SecurityConfig = {
      ...req.body,
      id: Date.now().toString(),
      status: 'inactive',
      lastUpdated: new Date().toISOString(),
      createdBy: req.user?.id || 'system',
      deploymentHistory: [],
      complianceStatus: {
        isCompliant: false,
        issues: []
      }
    };

    securityConfigs.push(newConfig);
    res.status(201).json(newConfig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create security configuration' });
  }
};

export const updateSecurityConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const configIndex = securityConfigs.findIndex(c => c.id === id);

    if (configIndex === -1) {
      res.status(404).json({ error: 'Security configuration not found' });
      return;
    }

    const updatedConfig: SecurityConfig = {
      ...securityConfigs[configIndex],
      ...req.body,
      lastUpdated: new Date().toISOString(),
      deploymentHistory: [
        ...securityConfigs[configIndex].deploymentHistory,
        {
          version: (securityConfigs[configIndex].deploymentHistory.length + 1).toString(),
          timestamp: new Date().toISOString(),
          status: 'in_progress',
          changes: [
            {
              field: 'status',
              oldValue: securityConfigs[configIndex].status,
              newValue: 'in_progress'
            }
          ]
        }
      ]
    };

    securityConfigs[configIndex] = updatedConfig;
    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update security configuration' });
  }
}; 