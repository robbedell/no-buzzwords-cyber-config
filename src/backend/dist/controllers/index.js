"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.getCVERecommendations = exports.searchCVE = exports.getCVEList = exports.getConfigurations = void 0;
const configurations = [
    {
        id: '1',
        name: 'Palo Alto Firewall Security Rules',
        type: 'palo_alto',
        description: 'Security-focused firewall rules for Palo Alto Networks',
        content: `
security-policy {
  name: "Web Server Access";
  source: ["trust", "dmz"];
  destination: ["untrust"];
  application: ["web-browsing", "ssl"];
  service: ["application-default"];
  action: "allow";
  log-setting: "security";
  log-start: true;
  log-end: true;
  description: "Allow web traffic to web servers";
}
    `,
        securityScore: 85,
        vulnerabilities: {
            high: 1,
            medium: 2,
            low: 1
        },
        status: 'active',
        lastUpdated: new Date().toISOString()
    },
    {
        id: '2',
        name: 'AWS Security Group Configuration',
        type: 'terraform',
        description: 'Security group rules for AWS infrastructure',
        content: `
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = "vpc-123456"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP traffic"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS traffic"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }
}
    `,
        securityScore: 90,
        vulnerabilities: {
            high: 0,
            medium: 1,
            low: 2
        },
        status: 'active',
        lastUpdated: new Date().toISOString()
    }
];
const cves = [
    {
        id: 'CVE-2024-0001',
        description: 'Critical vulnerability in Palo Alto Networks PAN-OS',
        severity: 'high',
        publishedDate: '2024-01-15',
        affectedProducts: ['PAN-OS 10.0', 'PAN-OS 10.1'],
        recommendedConfigs: ['palo_alto']
    },
    {
        id: 'CVE-2024-0002',
        description: 'Security vulnerability in AWS Security Groups',
        severity: 'medium',
        publishedDate: '2024-01-20',
        affectedProducts: ['AWS Security Groups'],
        recommendedConfigs: ['terraform']
    }
];
const dashboardStats = {
    overallSecurityScore: 87,
    criticalVulnerabilities: 1,
    pendingUpdates: 3,
    compliantConfigs: 2,
    recentEvents: [
        {
            id: '1',
            title: 'Critical CVE Detected',
            description: 'CVE-2024-0001 found in Palo Alto configuration',
            severity: 'high',
            status: 'open',
            timestamp: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Security Group Update Required',
            description: 'AWS security group needs configuration update',
            severity: 'medium',
            status: 'pending',
            timestamp: new Date().toISOString()
        }
    ]
};
const getConfigurations = async (req, res) => {
    try {
        res.json(configurations);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch configurations' });
    }
};
exports.getConfigurations = getConfigurations;
const getCVEList = async (req, res) => {
    try {
        res.json(cves);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch CVE list' });
    }
};
exports.getCVEList = getCVEList;
const searchCVE = async (req, res) => {
    try {
        const { query } = req.query;
        const results = cves.filter(cve => cve.id.toLowerCase().includes(query.toLowerCase()) ||
            cve.description.toLowerCase().includes(query.toLowerCase()) ||
            cve.affectedProducts.some(product => product.toLowerCase().includes(query.toLowerCase())));
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to search CVEs' });
    }
};
exports.searchCVE = searchCVE;
const getCVERecommendations = async (req, res) => {
    try {
        const { cveId } = req.params;
        const cve = cves.find(c => c.id === cveId);
        if (!cve) {
            return res.status(404).json({ error: 'CVE not found' });
        }
        const recommendations = cve.recommendedConfigs.map(type => ({
            title: `Update ${type} Configuration`,
            description: `Apply security updates to address ${cve.id}`,
            priority: cve.severity,
            type
        }));
        res.json(recommendations);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
exports.getCVERecommendations = getCVERecommendations;
const getDashboardStats = async (req, res) => {
    try {
        res.json(dashboardStats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=index.js.map