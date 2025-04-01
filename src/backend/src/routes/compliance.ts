import express from 'express';
import {
  getComplianceStatus,
  getComplianceIssues
} from '../controllers/compliance';

const router = express.Router();

// Compliance endpoints
router.get('/status', getComplianceStatus);
router.get('/issues', getComplianceIssues);

export default router; 