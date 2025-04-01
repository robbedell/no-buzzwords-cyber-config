import express from 'express';
import cveRoutes from './cve';
import dashboardRoutes from './dashboard';
import healthRoutes from './health';
import complianceRoutes from './compliance';
import securityRoutes from './security';

const router = express.Router();

// Health check
router.use('/health', healthRoutes);

// Security Configurations
router.use('/security', securityRoutes);

// CVE and Recommendations
router.use('/cve', cveRoutes);

// Dashboard
router.use('/dashboard', dashboardRoutes);

// Compliance
router.use('/compliance', complianceRoutes);

export default router; 