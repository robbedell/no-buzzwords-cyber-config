"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSecurityConfig = exports.getSecurityTemplate = exports.getSecurityTemplates = exports.updateSecurityConfig = exports.createSecurityConfig = exports.getSecurityConfig = exports.getSecurityConfigs = void 0;
const securityConfigs = [
    {
        id: '1',
        name: 'Production NGFW',
        cloudProvider: 'azure',
        securityService: 'ngfw',
        region: 'eastus',
        description: 'Production Palo Alto NGFW configuration',
        network: {
            zones: [
                {
                    name: 'trust',
                    subnets: ['10.0.1.0/24'],
                    securityLevel: 100,
                    description: 'Internal trusted network'
                },
                {
                    name: 'untrust',
                    subnets: ['10.0.2.0/24'],
                    securityLevel: 0,
                    description: 'External untrusted network'
                }
            ],
            vnetId: 'vnet-123',
            subnetIds: ['subnet-1', 'subnet-2']
        },
        securityPolicies: [
            {
                name: 'Web Access',
                sourceZones: ['trust'],
                destinationZones: ['untrust'],
                applications: ['web-browsing', 'ssl'],
                services: ['application-default'],
                action: 'allow',
                logging: true,
                description: 'Allow web traffic to internet'
            }
        ],
        threatPrevention: {
            antivirus: true,
            antiSpyware: true,
            vulnerabilityProtection: true,
            urlFiltering: true,
            fileBlocking: true,
            dataFiltering: true
        },
        logging: {
            trafficLogs: true,
            threatLogs: true,
            systemLogs: true,
            auditLogs: true,
            logRetention: 30
        },
        compliance: {
            standards: ['cis', 'nist'],
            status: 'compliant',
            lastCheck: new Date().toISOString(),
            issues: []
        },
        status: 'deployed',
        lastUpdated: new Date().toISOString(),
        createdBy: 'admin',
        deploymentHistory: [
            {
                timestamp: new Date().toISOString(),
                status: 'deployed',
                changes: ['Initial deployment'],
                user: 'admin'
            }
        ]
    }
];
const securityTemplates = [
    {
        id: '1',
        name: 'Palo Alto NGFW Base Template',
        cloudProvider: 'azure',
        securityService: 'ngfw',
        description: 'Base template for Palo Alto NGFW deployment in Azure',
        content: `
# Palo Alto NGFW Configuration
security-policy {
  name: "{{rule_name}}";
  source: {{source_zones}};
  destination: {{destination_zones}};
  application: {{applications}};
  service: {{services}};
  action: "{{action}}";
  log-setting: "security";
  log-start: true;
  log-end: true;
  description: "{{description}}";
}
    `,
        variables: [
            {
                name: 'rule_name',
                description: 'Name of the security policy rule',
                required: true,
                validation: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9-_]+$'
                }
            },
            {
                name: 'source_zones',
                description: 'Source security zones',
                required: true,
                validation: {
                    type: 'string',
                    pattern: '^\\[".*"\\]$'
                }
            }
        ],
        bestPractices: [
            {
                title: 'Zone-Based Security',
                description: 'Use specific zones for different security levels',
                impact: 'high'
            }
        ],
        compliance: {
            standards: ['cis', 'nist'],
            requirements: [
                'CIS 6.1: Implement network segmentation',
                'NIST 3.1: Separate user functionality'
            ]
        },
        lastUpdated: new Date().toISOString()
    }
];
const getSecurityConfigs = async (req, res) => {
    try {
        const { cloudProvider, securityService, status } = req.query;
        let filteredConfigs = [...securityConfigs];
        if (cloudProvider) {
            filteredConfigs = filteredConfigs.filter(config => config.cloudProvider === cloudProvider);
        }
        if (securityService) {
            filteredConfigs = filteredConfigs.filter(config => config.securityService === securityService);
        }
        if (status) {
            filteredConfigs = filteredConfigs.filter(config => config.status === status);
        }
        res.json(filteredConfigs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch security configurations' });
    }
};
exports.getSecurityConfigs = getSecurityConfigs;
const getSecurityConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const config = securityConfigs.find(c => c.id === id);
        if (!config) {
            return res.status(404).json({ error: 'Security configuration not found' });
        }
        res.json(config);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch security configuration' });
    }
};
exports.getSecurityConfig = getSecurityConfig;
const createSecurityConfig = async (req, res) => {
    var _a;
    try {
        const newConfig = {
            ...req.body,
            id: Date.now().toString(),
            status: 'draft',
            lastUpdated: new Date().toISOString(),
            createdBy: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'system',
            deploymentHistory: []
        };
        securityConfigs.push(newConfig);
        res.status(201).json(newConfig);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create security configuration' });
    }
};
exports.createSecurityConfig = createSecurityConfig;
const updateSecurityConfig = async (req, res) => {
    var _a;
    try {
        const { id } = req.params;
        const configIndex = securityConfigs.findIndex(c => c.id === id);
        if (configIndex === -1) {
            return res.status(404).json({ error: 'Security configuration not found' });
        }
        const updatedConfig = {
            ...securityConfigs[configIndex],
            ...req.body,
            lastUpdated: new Date().toISOString(),
            deploymentHistory: [
                ...securityConfigs[configIndex].deploymentHistory,
                {
                    timestamp: new Date().toISOString(),
                    status: 'pending_approval',
                    changes: ['Configuration updated'],
                    user: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'system'
                }
            ]
        };
        securityConfigs[configIndex] = updatedConfig;
        res.json(updatedConfig);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update security configuration' });
    }
};
exports.updateSecurityConfig = updateSecurityConfig;
const getSecurityTemplates = async (req, res) => {
    try {
        const { cloudProvider, securityService } = req.query;
        let filteredTemplates = [...securityTemplates];
        if (cloudProvider) {
            filteredTemplates = filteredTemplates.filter(template => template.cloudProvider === cloudProvider);
        }
        if (securityService) {
            filteredTemplates = filteredTemplates.filter(template => template.securityService === securityService);
        }
        res.json(filteredTemplates);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch security templates' });
    }
};
exports.getSecurityTemplates = getSecurityTemplates;
const getSecurityTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = securityTemplates.find(t => t.id === id);
        if (!template) {
            return res.status(404).json({ error: 'Security template not found' });
        }
        res.json(template);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch security template' });
    }
};
exports.getSecurityTemplate = getSecurityTemplate;
const validateSecurityConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const config = securityConfigs.find(c => c.id === id);
        if (!config) {
            return res.status(404).json({ error: 'Security configuration not found' });
        }
        const validation = {
            id: Date.now().toString(),
            configId: id,
            timestamp: new Date().toISOString(),
            status: 'compliant',
            issues: [],
            compliance: [
                {
                    standard: 'cis',
                    status: 'compliant',
                    requirements: [
                        {
                            id: '6.1',
                            description: 'Network segmentation',
                            status: 'compliant'
                        }
                    ]
                }
            ],
            securityScore: 95
        };
        res.json(validation);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to validate security configuration' });
    }
};
exports.validateSecurityConfig = validateSecurityConfig;
//# sourceMappingURL=security.js.map