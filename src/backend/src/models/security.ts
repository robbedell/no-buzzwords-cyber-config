import mongoose from 'mongoose';

const networkZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subnet: {
    type: String,
    required: true,
  },
  securityLevel: {
    type: String,
    required: true,
  },
});

const threatPreventionSchema = new mongoose.Schema({
  antivirus: {
    type: Boolean,
    default: false,
  },
  antiSpyware: {
    type: Boolean,
    default: false,
  },
  vulnerabilityProtection: {
    type: Boolean,
    default: false,
  },
  urlFiltering: {
    type: Boolean,
    default: false,
  },
  fileBlocking: {
    type: Boolean,
    default: false,
  },
  dataFiltering: {
    type: Boolean,
    default: false,
  },
});

const loggingConfigSchema = new mongoose.Schema({
  trafficLogs: {
    type: Boolean,
    default: true,
  },
  threatLogs: {
    type: Boolean,
    default: true,
  },
  systemLogs: {
    type: Boolean,
    default: true,
  },
  auditLogs: {
    type: Boolean,
    default: true,
  },
});

const deploymentHistoryEntrySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'in_progress'],
    required: true,
  },
  changes: [{
    type: String,
  }],
  user: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

const complianceStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['compliant', 'non_compliant'],
    required: true,
  },
  issues: [{
    type: String,
  }],
});

const securityConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cloudProvider: {
    type: String,
    required: true,
    enum: ['aws', 'azure', 'gcp'],
  },
  securityService: {
    type: String,
    required: true,
    enum: ['firewall', 'security_group', 'key_vault', 'sentinel', 'ngfw'],
  },
  region: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['deployed', 'pending_approval', 'failed'],
    default: 'pending_approval',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  networkZones: [networkZoneSchema],
  threatPrevention: {
    type: threatPreventionSchema,
    default: () => ({}),
  },
  logging: {
    type: loggingConfigSchema,
    default: () => ({}),
  },
  compliance: {
    type: complianceStatusSchema,
    default: () => ({
      status: 'non_compliant',
      issues: [],
    }),
  },
  deploymentHistory: [deploymentHistoryEntrySchema],
});

// Update the lastUpdated timestamp before saving
securityConfigSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export const SecurityConfig = mongoose.model('SecurityConfig', securityConfigSchema, 'securityconfigs'); 