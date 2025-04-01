import express from 'express';
import { Template } from '../models/template';

const router = express.Router();

// Get all templates
router.get('/', async (_req, res) => {
  try {
    const templates = await Template.find();
    return res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return res.status(500).json({ message: 'Error fetching templates' });
  }
});

// Get a single template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    return res.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return res.status(500).json({ message: 'Error fetching template' });
  }
});

// Create a new template
router.post('/', async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    return res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    return res.status(500).json({ message: 'Error creating template' });
  }
});

// Update a template
router.put('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    return res.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    return res.status(500).json({ message: 'Error updating template' });
  }
});

// Delete a template
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    return res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return res.status(500).json({ message: 'Error deleting template' });
  }
});

export default router; 