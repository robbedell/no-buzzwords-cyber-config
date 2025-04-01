"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfigTemplate = exports.updateConfigTemplate = exports.getConfigTemplate = exports.getConfigTemplates = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CONFIGS_DIR = path_1.default.join(process.cwd(), 'Configs');
function extractVariables(content) {
    const variables = [];
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
function getFileExtension(type) {
    switch (type) {
        case 'terraform':
            return 'tf';
        case 'ansible':
            return 'yml';
        default:
            return 'txt';
    }
}
function getTemplateFilePath(template) {
    const baseDir = path_1.default.join(CONFIGS_DIR, 'palo_alto', 'vm_series');
    const subDir = template.type === 'terraform' ? 'terraform' : 'ansible';
    const extension = getFileExtension(template.type);
    return path_1.default.join(baseDir, subDir, `${template.name}.${extension}`);
}
async function getAllTemplates() {
    const templates = [];
    const paloAltoDir = path_1.default.join(CONFIGS_DIR, 'palo_alto', 'vm_series');
    const terraformDir = path_1.default.join(paloAltoDir, 'terraform');
    const terraformFiles = fs_1.default.readdirSync(terraformDir);
    terraformFiles.forEach(file => {
        if (file.endsWith('.tf')) {
            const content = fs_1.default.readFileSync(path_1.default.join(terraformDir, file), 'utf-8');
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
    const ansibleDir = path_1.default.join(paloAltoDir, 'ansible');
    const ansibleFiles = fs_1.default.readdirSync(ansibleDir);
    ansibleFiles.forEach(file => {
        if (file.endsWith('.yml') || file.endsWith('.yaml')) {
            const content = fs_1.default.readFileSync(path_1.default.join(ansibleDir, file), 'utf-8');
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
async function findTemplateById(id) {
    const templates = await getAllTemplates();
    return templates.find((t) => t.id === id) || null;
}
const getConfigTemplates = async (req, res) => {
    try {
        const templates = await getAllTemplates();
        res.json(templates);
    }
    catch (error) {
        console.error('Error fetching config templates:', error);
        res.status(500).json({ error: 'Failed to fetch configuration templates' });
    }
};
exports.getConfigTemplates = getConfigTemplates;
const getConfigTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await findTemplateById(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    }
    catch (error) {
        console.error('Error fetching config template:', error);
        res.status(500).json({ error: 'Failed to fetch configuration template' });
    }
};
exports.getConfigTemplate = getConfigTemplate;
const updateConfigTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, variables } = req.body;
        const template = await findTemplateById(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        const filePath = getTemplateFilePath(template);
        fs_1.default.writeFileSync(filePath, content);
        res.json({
            ...template,
            content,
            variables,
            lastUpdated: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('Error updating config template:', error);
        res.status(500).json({ error: 'Failed to update configuration template' });
    }
};
exports.updateConfigTemplate = updateConfigTemplate;
const exportConfigTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { variables } = req.body;
        const template = await findTemplateById(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        let content = template.content;
        Object.entries(variables).forEach(([key, value]) => {
            content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
        });
        res.json({
            content,
            filename: `${template.name}-exported.${getFileExtension(template.type)}`,
        });
    }
    catch (error) {
        console.error('Error exporting config template:', error);
        res.status(500).json({ error: 'Failed to export configuration template' });
    }
};
exports.exportConfigTemplate = exportConfigTemplate;
//# sourceMappingURL=configTemplates.js.map