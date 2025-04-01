import { SecurityConfig } from '../models/security';
import { logger } from '../utils/logger';

export const seedSecurityConfigs = async () => {
  try {
    // Clear existing configs
    await SecurityConfig.deleteMany({});

    const sampleConfigs = [
      {
        name: 'AWS Production Firewall',
        description: 'Main firewall configuration for AWS production environment',
        cloudProvider: 'aws',
        securityService: 'firewall',
        region: 'us-west-2',
        status: 'deployed',
        networkZones: [
          {
            name: 'DMZ',
            subnet: '10.0.1.0/24',
            securityLevel: 'high',
          },
          {
            name: 'Internal',
            subnet: '10.0.2.0/24',
            securityLevel: 'medium',
          },
        ],
        threatPrevention: {
          antivirus: true,
          antiSpyware: true,
          vulnerabilityProtection: true,
          urlFiltering: true,
          fileBlocking: true,
          dataFiltering: true,
        },
        logging: {
          trafficLogs: true,
          threatLogs: true,
          systemLogs: true,
          auditLogs: true,
        },
        compliance: {
          status: 'compliant',
          issues: [],
        },
        deploymentHistory: [
          {
            timestamp: new Date(),
            status: 'success',
            changes: ['Initial deployment'],
            user: 'admin',
            version: '1.0.0',
          },
        ],
      },
      {
        name: 'Azure Dev Security Groups',
        description: 'Security group configuration for Azure development environment',
        cloudProvider: 'azure',
        securityService: 'security_group',
        region: 'eastus',
        status: 'deployed',
        networkZones: [
          {
            name: 'Dev',
            subnet: '172.16.1.0/24',
            securityLevel: 'medium',
          },
        ],
        threatPrevention: {
          antivirus: true,
          antiSpyware: true,
          vulnerabilityProtection: false,
          urlFiltering: true,
          fileBlocking: false,
          dataFiltering: false,
        },
        logging: {
          trafficLogs: true,
          threatLogs: true,
          systemLogs: false,
          auditLogs: true,
        },
        compliance: {
          status: 'non_compliant',
          issues: ['Missing vulnerability protection', 'Incomplete logging configuration'],
        },
        deploymentHistory: [
          {
            timestamp: new Date(),
            status: 'success',
            changes: ['Initial setup'],
            user: 'admin',
            version: '1.0.0',
          },
        ],
      },
    ];

    await SecurityConfig.insertMany(sampleConfigs);
    logger.info('Successfully seeded security configurations');
  } catch (error) {
    logger.error('Error seeding security configurations:', error);
    throw error;
  }
}; 