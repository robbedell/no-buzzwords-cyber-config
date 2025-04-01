import mongoose from 'mongoose';

export interface ITemplate {
  name: string;
  description: string;
  cloudProvider: string;
  securityService: string;
  usageCount: number;
  lastUpdated: Date;
  tags: string[];
  configuration: Record<string, any>;
  createdBy: string;
  version: string;
}

const templateSchema = new mongoose.Schema<ITemplate>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cloudProvider: { type: String, required: true },
  securityService: { type: String, required: true },
  usageCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  tags: [{ type: String }],
  configuration: { type: mongoose.Schema.Types.Mixed, required: true },
  createdBy: { type: String, required: true },
  version: { type: String, required: true }
});

export const Template = mongoose.model<ITemplate>('Template', templateSchema); 