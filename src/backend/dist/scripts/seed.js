"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CVE_1 = require("../models/CVE");
const Dashboard_1 = require("../models/Dashboard");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/security-config';
const seedCVEs = [
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
const seedDashboardStats = {
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
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        await CVE_1.CVEModel.deleteMany({});
        await Dashboard_1.DashboardStatsModel.deleteMany({});
        await CVE_1.CVEModel.insertMany(seedCVEs);
        await Dashboard_1.DashboardStatsModel.create(seedDashboardStats);
        console.log('Database seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map