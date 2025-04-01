"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCVERecommendations = exports.searchCVE = void 0;
const searchCVE = async (req, res) => {
    try {
        const { cveId, product, description } = req.query;
        const mockCVEs = [
            {
                id: 'CVE-2024-0001',
                description: 'Critical vulnerability in Palo Alto Networks PAN-OS',
                severity: 'high',
                publishedDate: '2024-03-30',
                affectedProducts: ['PAN-OS < 10.2.0'],
                recommendedConfigs: [
                    {
                        type: 'palo_alto',
                        description: 'Update PAN-OS to version 10.2.0 or later',
                        config: `
              <system>
                <software>
                  <check>
                    <upgrade-download-only>no</upgrade-download-only>
                    <period>daily</period>
                    <schedule>daily</schedule>
                  </check>
                </software>
              </system>
            `
                    },
                    {
                        type: 'terraform',
                        description: 'Update PAN-OS version in Terraform configuration',
                        config: `
              resource "panos_panorama_software" "update" {
                version = "10.2.0"
                target_version = "10.2.0"
                download = true
                install = true
                restart = true
              }
            `
                    }
                ]
            },
            {
                id: 'CVE-2024-0002',
                description: 'Medium severity issue in GlobalProtect VPN',
                severity: 'medium',
                publishedDate: '2024-03-29',
                affectedProducts: ['GlobalProtect < 5.2.0'],
                recommendedConfigs: [
                    {
                        type: 'palo_alto',
                        description: 'Update GlobalProtect configuration',
                        config: `
              <global-protect>
                <client-config>
                  <version>5.2.0</version>
                  <enforce-version>yes</enforce-version>
                </client-config>
              </global-protect>
            `
                    }
                ]
            }
        ];
        let results = mockCVEs;
        if (cveId) {
            results = results.filter(cve => cve.id.toLowerCase().includes(cveId.toLowerCase()));
        }
        if (product) {
            results = results.filter(cve => cve.affectedProducts.some(p => p.toLowerCase().includes(product.toLowerCase())));
        }
        if (description) {
            results = results.filter(cve => cve.description.toLowerCase().includes(description.toLowerCase()));
        }
        res.json(results);
    }
    catch (error) {
        console.error('Error searching CVE:', error);
        res.status(500).json({ error: 'Failed to search CVE database' });
    }
};
exports.searchCVE = searchCVE;
const getCVERecommendations = async (req, res) => {
    try {
        const { cveId } = req.params;
        const mockRecommendations = {
            cveId,
            recommendations: [
                {
                    type: 'palo_alto',
                    description: 'Update security policies to mitigate vulnerability',
                    config: `
            <security>
              <policies>
                <policy>
                  <name>Block CVE-${cveId}</name>
                  <action>block</action>
                  <source>any</source>
                  <destination>any</destination>
                  <application>any</application>
                  <service>any</service>
                </policy>
              </policies>
            </security>
          `
                },
                {
                    type: 'terraform',
                    description: 'Add security policy to Terraform configuration',
                    config: `
            resource "panos_security_policy" "block_cve" {
              name = "Block CVE-${cveId}"
              action = "block"
              source_zones = ["any"]
              destination_zones = ["any"]
              source_addresses = ["any"]
              destination_addresses = ["any"]
              applications = ["any"]
              services = ["any"]
            }
          `
                }
            ]
        };
        res.json(mockRecommendations);
    }
    catch (error) {
        console.error('Error fetching CVE recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch CVE recommendations' });
    }
};
exports.getCVERecommendations = getCVERecommendations;
//# sourceMappingURL=cveSearch.js.map