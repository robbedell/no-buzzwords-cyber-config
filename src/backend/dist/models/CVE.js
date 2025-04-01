"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVEModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CVERecommendedConfigSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ['palo_alto', 'terraform', 'ansible'],
        required: true
    },
    description: { type: String, required: true },
    config: { type: String, required: true },
    bestPractices: [{ type: String }]
});
const CVESchema = new mongoose_1.default.Schema({
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
CVESchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.CVEModel = mongoose_1.default.model('CVE', CVESchema);
//# sourceMappingURL=CVE.js.map