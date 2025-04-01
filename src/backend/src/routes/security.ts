import express, { Request, Response } from 'express';
import { SecurityConfig } from '../models/security';

const router = express.Router();

// Get all security configurations
router.get('/configs', async (_req: Request, res: Response) => {
  try {
    const configs = await SecurityConfig.find();
    res.json(configs);
  } catch (error) {
    console.error('Error fetching security configs:', error);
    res.status(500).json({ error: 'Failed to fetch security configurations' });
  }
});

// Get a specific security configuration
router.get('/configs/:id', async (req: Request, res: Response) => {
  try {
    const config = await SecurityConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ error: 'Security configuration not found' });
    }
    return res.json(config);
  } catch (error) {
    console.error('Error fetching security config:', error);
    return res.status(500).json({ error: 'Failed to fetch security configuration' });
  }
});

// Create a new security configuration
router.post('/configs', async (req: Request, res: Response) => {
  try {
    const config = new SecurityConfig(req.body);
    await config.save();
    res.status(201).json(config);
  } catch (error) {
    console.error('Error creating security config:', error);
    res.status(500).json({ error: 'Failed to create security configuration' });
  }
});

// Update a security configuration
router.put('/configs/:id', async (req: Request, res: Response) => {
  try {
    const config = await SecurityConfig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!config) {
      return res.status(404).json({ error: 'Security configuration not found' });
    }
    return res.json(config);
  } catch (error) {
    console.error('Error updating security config:', error);
    return res.status(500).json({ error: 'Failed to update security configuration' });
  }
});

// Delete a security configuration
router.delete('/configs/:id', async (req: Request, res: Response) => {
  try {
    const config = await SecurityConfig.findByIdAndDelete(req.params.id);
    if (!config) {
      return res.status(404).json({ error: 'Security configuration not found' });
    }
    return res.json({ message: 'Security configuration deleted successfully' });
  } catch (error) {
    console.error('Error deleting security config:', error);
    return res.status(500).json({ error: 'Failed to delete security configuration' });
  }
});

export default router; 