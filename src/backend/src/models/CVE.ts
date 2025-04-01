import mongoose from 'mongoose';
import { CVE } from '../types';

const CVERecommendedConfigSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['palo_alto', 'terraform', 'ansible'],
    required: true
  },
  description: { type: String, required: true },
  config: { type: String, required: true },
  bestPractices: [{ type: String }]
});

const CVESchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  severity: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true
  },
  publishedDate: { type: Date, required: true },
  affectedProducts: [{ type: String }],
  recommendedConfigs: [CVERecommendedConfigSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CVESchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const CVEModel = mongoose.model<CVE>('CVE', CVESchema); 