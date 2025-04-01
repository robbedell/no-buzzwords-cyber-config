"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const security_1 = require("../controllers/security");
const cve_1 = __importDefault(require("./cve"));
const dashboard_1 = __importDefault(require("./dashboard"));
const router = express_1.default.Router();
router.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});
router.get('/security/configs', security_1.getSecurityConfigs);
router.get('/security/configs/:id', security_1.getSecurityConfig);
router.post('/security/configs', security_1.createSecurityConfig);
router.put('/security/configs/:id', security_1.updateSecurityConfig);
router.post('/security/configs/:id/validate', security_1.validateSecurityConfig);
router.get('/security/templates', security_1.getSecurityTemplates);
router.get('/security/templates/:id', security_1.getSecurityTemplate);
router.use('/cve', cve_1.default);
router.use('/dashboard', dashboard_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map