import express, { Request, Response } from 'express';
import { SecurityConfig } from '../models/security';
import { Template } from '../models/template';

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

// Template Routes

// Get all templates
router.get('/templates', async (_req: Request, res: Response) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Get a specific template
router.get('/templates/:id', async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    return res.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return res.status(500).json({ error: 'Failed to fetch template' });
  }
});

// Create a new template
router.post('/templates', async (req: Request, res: Response) => {
  try {
    const template = new Template({
      ...req.body,
      lastUpdated: new Date(),
      usageCount: 0
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Update a template
router.put('/templates/:id', async (req: Request, res: Response) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdated: new Date()
      },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    return res.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    return res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete a template
router.delete('/templates/:id', async (req: Request, res: Response) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    return res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return res.status(500).json({ error: 'Failed to delete template' });
  }
});

export default router; 