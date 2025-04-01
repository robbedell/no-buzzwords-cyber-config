import mongoose from 'mongoose';

const complianceIssueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  severity: { type: String, enum: ['high', 'medium', 'low'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const complianceStatusSchema = new mongoose.Schema({
  overallScore: { type: Number, required: true },
  totalChecks: { type: Number, required: true },
  passedChecks: { type: Number, required: true },
  failedChecks: { type: Number, required: true },
  issues: [complianceIssueSchema],
  lastUpdated: { type: Date, default: Date.now }
});

export const ComplianceStatusModel = mongoose.model('ComplianceStatus', complianceStatusSchema);
export const ComplianceIssueModel = mongoose.model('ComplianceIssue', complianceIssueSchema); 