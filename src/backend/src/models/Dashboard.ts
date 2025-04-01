import mongoose from 'mongoose';
import { DashboardStats } from '../types/dashboard';

const RecentActivitySchema = new mongoose.Schema({
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

const ConfigDistributionSchema = new mongoose.Schema({
  cloudProvider: {
    type: String,
    enum: ['aws', 'azure', 'gcp'],
    required: true
  },
  count: { type: Number, required: true }
});

const ServiceDistributionSchema = new mongoose.Schema({
  service: {
    type: String,
    enum: ['firewall', 'security_group', 'waf', 'ddos_protection'],
    required: true
  },
  count: { type: Number, required: true }
});

const ComplianceIssueSchema = new mongoose.Schema({
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

const DashboardStatsSchema = new mongoose.Schema({
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

DashboardStatsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const DashboardStatsModel = mongoose.model<DashboardStats>('DashboardStats', DashboardStatsSchema); 