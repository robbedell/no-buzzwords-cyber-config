"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cve_1 = require("../controllers/cve");
const router = express_1.default.Router();
router.get('/search', cve_1.searchCVE);
router.get('/:id', cve_1.getCVE);
router.get('/:id/recommendations', cve_1.getCVERecommendations);
router.get('/recommendations', cve_1.getSecurityRecommendations);
exports.default = router;
//# sourceMappingURL=cve.js.map