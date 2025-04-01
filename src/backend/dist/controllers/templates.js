"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfigTemplate = exports.updateConfigTemplate = exports.getConfigTemplate = exports.getConfigTemplates = void 0;
const templates = [
    {
        id: '1',
        name: 'Palo Alto Firewall Security Rules',
        type: 'palo_alto',
        description: 'Security-focused firewall rules template for Palo Alto Networks',
        content: `
security-policy {
  name: "{{rule_name}}";
  source: {{source_zones}};
  destination: {{destination_zones}};
  application: {{applications}};
  service: {{services}};
  action: {{action}};
  log-setting: "{{log_setting}}";
  log-start: true;
  log-end: true;
  description: "{{description}}";
}
    `,
        variables: ['rule_name', 'source_zones', 'destination_zones', 'applications', 'services', 'action', 'log_setting', 'description'],
        bestPractices: [
            'Use specific source and destination zones',
            'Include logging for all security rules',
            'Regularly review and update rule descriptions',
            'Follow least privilege principle',
            'Document all rule changes'
        ],
        lastUpdated: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Terraform Security Group Rules',
        type: 'terraform',
        description: 'Security group configuration template for AWS infrastructure',
        content: `
resource "aws_security_group" "{{group_name}}" {
  name        = "{{group_name}}"
  description = "{{description}}"
  vpc_id      = "{{vpc_id}}"

  ingress {
    from_port   = {{ingress_port}}
    to_port     = {{ingress_port}}
    protocol    = "{{protocol}}"
    cidr_blocks = ["{{cidr_blocks}}"]
    description = "{{ingress_description}}"
  }

  egress {
    from_port   = {{egress_port}}
    to_port     = {{egress_port}}
    protocol    = "{{protocol}}"
    cidr_blocks = ["{{cidr_blocks}}"]
    description = "{{egress_description}}"
  }

  tags = {
    Name = "{{group_name}}"
  }
}
    `,
        variables: [
            'group_name',
            'description',
            'vpc_id',
            'ingress_port',
            'egress_port',
            'protocol',
            'cidr_blocks',
            'ingress_description',
            'egress_description'
        ],
        bestPractices: [
            'Use specific CIDR ranges',
            'Include descriptive tags',
            'Document all security group changes',
            'Regularly review and update rules',
            'Follow principle of least privilege'
        ],
        lastUpdated: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Ansible Security Hardening',
        type: 'ansible',
        description: 'Security hardening playbook template for Linux systems',
        content: `
---
- name: Security Hardening Configuration
  hosts: all
  become: true
  tasks:
    - name: Configure firewall rules
      ufw:
        rule: "{{rule}}"
        port: "{{port}}"
        proto: "{{protocol}}"
        state: "{{state}}"

    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: yes

    - name: Configure SSH security
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "{{regexp}}"
        line: "{{line}}"
        state: "{{state}}"
    `,
        variables: ['rule', 'port', 'protocol', 'state', 'regexp', 'line'],
        bestPractices: [
            'Regularly update system packages',
            'Configure firewall rules',
            'Harden SSH configuration',
            'Use secure protocols',
            'Document all changes'
        ],
        lastUpdated: new Date().toISOString()
    }
];
const getConfigTemplates = async (req, res) => {
    try {
        res.json(templates);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
};
exports.getConfigTemplates = getConfigTemplates;
const getConfigTemplate = async (req, res) => {
    try {
        const template = templates.find(t => t.id === req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch template' });
    }
};
exports.getConfigTemplate = getConfigTemplate;
const updateConfigTemplate = async (req, res) => {
    try {
        const template = templates.find(t => t.id === req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        const updatedTemplate = { ...template, ...req.body, lastUpdated: new Date().toISOString() };
        res.json(updatedTemplate);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update template' });
    }
};
exports.updateConfigTemplate = updateConfigTemplate;
const exportConfigTemplate = async (req, res) => {
    try {
        const template = templates.find(t => t.id === req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        let content = template.content;
        const variables = req.body.variables || {};
        Object.entries(variables).forEach(([key, value]) => {
            content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });
        res.json(content);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to export template' });
    }
};
exports.exportConfigTemplate = exportConfigTemplate;
//# sourceMappingURL=templates.js.map