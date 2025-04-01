"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecurityRecommendations = exports.getCVERecommendations = exports.getCVE = exports.searchCVE = void 0;
const CVE_1 = require("../models/CVE");
const mockRecommendations = [
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
const searchCVE = async (req, res) => {
    try {
        const query = req.query;
        const mongoQuery = {};
        if (query.query) {
            mongoQuery.$or = [
                { id: { $regex: query.query, $options: 'i' } },
                { description: { $regex: query.query, $options: 'i' } }
            ];
        }
        if (query.severity) {
            mongoQuery.severity = query.severity;
        }
        if (query.product) {
            mongoQuery.affectedProducts = { $regex: query.product, $options: 'i' };
        }
        const cves = await CVE_1.CVEModel.find(mongoQuery);
        res.json(cves);
    }
    catch (error) {
        console.error('Error searching CVEs:', error);
        res.status(500).json({ error: 'Failed to search CVEs' });
    }
};
exports.searchCVE = searchCVE;
const getCVE = async (req, res) => {
    try {
        const { id } = req.params;
        const cve = await CVE_1.CVEModel.findOne({ id });
        if (!cve) {
            return res.status(404).json({ error: 'CVE not found' });
        }
        res.json(cve);
    }
    catch (error) {
        console.error('Error getting CVE:', error);
        res.status(500).json({ error: 'Failed to get CVE' });
    }
};
exports.getCVE = getCVE;
const getCVERecommendations = async (req, res) => {
    try {
        const { id } = req.params;
        const cve = await CVE_1.CVEModel.findOne({ id });
        if (!cve) {
            return res.status(404).json({ error: 'CVE not found' });
        }
        res.json({ recommendations: cve.recommendedConfigs });
    }
    catch (error) {
        console.error('Error getting CVE recommendations:', error);
        res.status(500).json({ error: 'Failed to get CVE recommendations' });
    }
};
exports.getCVERecommendations = getCVERecommendations;
const getSecurityRecommendations = async (req, res) => {
    try {
        res.json(mockRecommendations);
    }
    catch (error) {
        console.error('Error getting security recommendations:', error);
        res.status(500).json({ error: 'Failed to get security recommendations' });
    }
};
exports.getSecurityRecommendations = getSecurityRecommendations;
//# sourceMappingURL=cve.js.map