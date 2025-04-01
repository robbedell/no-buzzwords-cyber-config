import mongoose from 'mongoose';

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
    enum: ['ngfw', 'waf', 'ips'],
  },
  region: {
    type: String,
    required: true,
  },
  networkZones: [{
    type: String,
    required: true,
  }],
  threatPrevention: {
    enabled: {
      type: Boolean,
      default: true,
    },
    rules: [{
      type: String,
    }],
  },
  logging: {
    enabled: {
      type: Boolean,
      default: true,
    },
    retentionDays: {
      type: Number,
      default: 30,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
securityConfigSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const SecurityConfig = mongoose.model('SecurityConfig', securityConfigSchema); 