import express from 'express';
import {
  searchCVE,
  getCVE,
  getCVERecommendations,
  getSecurityRecommendations,
  getCVEAlerts
} from '../controllers/cve';

const router = express.Router();

// CVE endpoints
router.get('/search', searchCVE);
router.get('/alerts', getCVEAlerts);
router.get('/:id', getCVE);
router.get('/:id/recommendations', getCVERecommendations);

// Security recommendations
router.get('/recommendations', getSecurityRecommendations);

export default router; 