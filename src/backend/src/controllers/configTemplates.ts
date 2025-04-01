import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface ConfigTemplate {
  id: string;
  name: string;
  type: 'palo_alto' | 'terraform' | 'ansible';
  description: string;
  content: string;
  variables: string[];
  lastUpdated: string;
}

const CONFIGS_DIR = path.join(process.cwd(), 'Configs');

// Helper functions
function extractVariables(content: string): string[] {
  const variables: string[] = [];
  const matches = content.match(/\{\{([^}]+)\}\}/g);
  if (matches) {
    matches.forEach(match => {
      const variable = match.slice(2, -2).trim();
      if (!variables.includes(variable)) {
        variables.push(variable);
      }
    });
  }
  return variables;
}

function getFileExtension(type: string): string {
  switch (type) {
    case 'terraform':
      return 'tf';
    case 'ansible':
      return 'yml';
    default:
      return 'txt';
  }
}

function getTemplateFilePath(template: ConfigTemplate): string {
  const baseDir = path.join(CONFIGS_DIR, 'palo_alto', 'vm_series');
  const subDir = template.type === 'terraform' ? 'terraform' : 'ansible';
  const extension = getFileExtension(template.type);
  return path.join(baseDir, subDir, `${template.name}.${extension}`);
}

async function getAllTemplates(): Promise<ConfigTemplate[]> {
  const templates: ConfigTemplate[] = [];
  
  // Read Palo Alto templates
  const paloAltoDir = path.join(CONFIGS_DIR, 'palo_alto', 'vm_series');
  
  // Read Terraform templates
  const terraformDir = path.join(paloAltoDir, 'terraform');
  const terraformFiles = fs.readdirSync(terraformDir);
  terraformFiles.forEach(file => {
    if (file.endsWith('.tf')) {
      const content = fs.readFileSync(path.join(terraformDir, file), 'utf-8');
      templates.push({
        id: `terraform-${file}`,
        name: file.replace('.tf', ''),
        type: 'terraform',
        description: 'Terraform configuration template',
        content,
        variables: extractVariables(content),
        lastUpdated: new Date().toISOString(),
      });
    }
  });

  // Read Ansible templates
  const ansibleDir = path.join(paloAltoDir, 'ansible');
  const ansibleFiles = fs.readdirSync(ansibleDir);
  ansibleFiles.forEach(file => {
    if (file.endsWith('.yml') || file.endsWith('.yaml')) {
      const content = fs.readFileSync(path.join(ansibleDir, file), 'utf-8');
      templates.push({
        id: `ansible-${file}`,
        name: file.replace(/\.(yml|yaml)$/, ''),
        type: 'ansible',
        description: 'Ansible configuration template',
        content,
        variables: extractVariables(content),
        lastUpdated: new Date().toISOString(),
      });
    }
  });

  return templates;
}

async function findTemplateById(id: string): Promise<ConfigTemplate | null> {
  const templates = await getAllTemplates();
  return templates.find((t: ConfigTemplate) => t.id === id) || null;
}

export const getConfigTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await getAllTemplates();
    res.json(templates);
  } catch (error) {
    console.error('Error fetching config templates:', error);
    res.status(500).json({ error: 'Failed to fetch configuration templates' });
  }
};

export const getConfigTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await findTemplateById(id);
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error fetching config template:', error);
    res.status(500).json({ error: 'Failed to fetch configuration template' });
  }
};

export const updateConfigTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, variables } = req.body;
    
    const template = await findTemplateById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Update template content
    const filePath = getTemplateFilePath(template);
    fs.writeFileSync(filePath, content);

    res.json({
      ...template,
      content,
      variables,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating config template:', error);
    res.status(500).json({ error: 'Failed to update configuration template' });
  }
};

export const exportConfigTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { variables } = req.body;
    
    const template = await findTemplateById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Replace variables in template
    let content = template.content;
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value as string);
    });

    res.json({
      content,
      filename: `${template.name}-exported.${getFileExtension(template.type)}`,
    });
  } catch (error) {
    console.error('Error exporting config template:', error);
    res.status(500).json({ error: 'Failed to export configuration template' });
  }
}; 