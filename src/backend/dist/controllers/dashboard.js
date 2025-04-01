"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Dashboard_1 = require("../models/Dashboard");
const mockDashboardStats = {
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
const getDashboardStats = async (req, res) => {
    try {
        const stats = await Dashboard_1.DashboardStatsModel.findOne()
            .sort({ updatedAt: -1 })
            .limit(1);
        if (!stats) {
            const initialStats = {
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
            const newStats = await Dashboard_1.DashboardStatsModel.create(initialStats);
            return res.json(newStats);
        }
        res.json(stats);
    }
    catch (error) {
        console.error('Error getting dashboard stats:', error);
        res.status(500).json({ error: 'Failed to get dashboard stats' });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboard.js.map