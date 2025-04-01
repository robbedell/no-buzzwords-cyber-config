import mongoose from 'mongoose';
import { CVEModel } from '../models/CVE';
import { DashboardStatsModel } from '../models/Dashboard';
import { CVE } from '../types/cve';
import { DashboardStats } from '../types/dashboard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/security-config';

const seedCVEs: CVE[] = [
  {
    id: 'CVE-2024-0001',
    description: 'A critical vulnerability in Palo Alto Networks PAN-OS',
    severity: 'high',
    publishedDate: '2024-01-01',
    affectedProducts: ['Palo Alto Networks PAN-OS'],
    recommendedConfigs: [
      {
        type: 'palo_alto',
        description: 'Update PAN-OS to version 10.2.0 or later',
        config: 'set system software version 10.2.0',
        bestPractices: [
          'Backup configuration before update',
          'Schedule maintenance window',
          'Test in non-production environment first'
        ]
      }
    ]
  },
  {
    id: 'CVE-2024-0002',
    description: 'Security vulnerability in AWS WAF rules',
    severity: 'medium',
    publishedDate: '2024-01-15',
    affectedProducts: ['AWS WAF'],
    recommendedConfigs: [
      {
        type: 'terraform',
        description: 'Update WAF rules to block malicious traffic',
        config: 'resource "aws_waf_rule" "block_malicious" { ... }',
        bestPractices: [
          'Review existing WAF rules',
          'Test rules in staging environment',
          'Monitor for false positives'
        ]
      }
    ]
  }
];

const seedDashboardStats: DashboardStats = {
  totalConfigs: 10,
  activeConfigs: 8,
  pendingDeployments: 2,
  failedDeployments: 1,
  complianceScore: 85,
  recentActivity: [
    {
      id: 'ACT-001',
      type: 'deployment',
      timestamp: '2024-01-01T10:00:00Z',
      status: 'success',
      details: 'Deployed security config for AWS WAF'
    },
    {
      id: 'ACT-002',
      type: 'update',
      timestamp: '2024-01-01T09:30:00Z',
      status: 'success',
      details: 'Updated firewall rules for Palo Alto Networks'
    }
  ],
  configDistribution: [
    {
      cloudProvider: 'aws',
      count: 5
    },
    {
      cloudProvider: 'azure',
      count: 3
    },
    {
      cloudProvider: 'gcp',
      count: 2
    }
  ],
  serviceDistribution: [
    {
      service: 'firewall',
      count: 4
    },
    {
      service: 'security_group',
      count: 3
    },
    {
      service: 'waf',
      count: 2
    },
    {
      service: 'ddos_protection',
      count: 1
    }
  ],
  complianceIssues: [
    {
      standard: 'cis',
      count: 2,
      severity: 'high'
    },
    {
      standard: 'nist',
      count: 1,
      severity: 'medium'
    }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await CVEModel.deleteMany({});
    await DashboardStatsModel.deleteMany({});

    // Insert seed data
    await CVEModel.insertMany(seedCVEs);
    await DashboardStatsModel.create(seedDashboardStats);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 