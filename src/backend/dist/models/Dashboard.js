"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RecentActivitySchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ['deployment', 'update', 'validation'],
        required: true
    },
    timestamp: { type: Date, required: true },
    status: {
        type: String,
        enum: ['success', 'failed', 'in_progress'],
        required: true
    },
    details: { type: String, required: true }
});
const ConfigDistributionSchema = new mongoose_1.default.Schema({
    cloudProvider: {
        type: String,
        enum: ['aws', 'azure', 'gcp'],
        required: true
    },
    count: { type: Number, required: true }
});
const ServiceDistributionSchema = new mongoose_1.default.Schema({
    service: {
        type: String,
        enum: ['firewall', 'security_group', 'waf', 'ddos_protection'],
        required: true
    },
    count: { type: Number, required: true }
});
const ComplianceIssueSchema = new mongoose_1.default.Schema({
    standard: {
        type: String,
        enum: ['cis', 'nist', 'pci', 'hipaa'],
        required: true
    },
    count: { type: Number, required: true },
    severity: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    }
});
const DashboardStatsSchema = new mongoose_1.default.Schema({
    totalConfigs: { type: Number, required: true },
    activeConfigs: { type: Number, required: true },
    pendingDeployments: { type: Number, required: true },
    failedDeployments: { type: Number, required: true },
    complianceScore: { type: Number, required: true },
    recentActivity: [RecentActivitySchema],
    configDistribution: [ConfigDistributionSchema],
    serviceDistribution: [ServiceDistributionSchema],
    complianceIssues: [ComplianceIssueSchema],
    updatedAt: { type: Date, default: Date.now }
});
DashboardStatsSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.DashboardStatsModel = mongoose_1.default.model('DashboardStats', DashboardStatsSchema);
//# sourceMappingURL=Dashboard.js.map