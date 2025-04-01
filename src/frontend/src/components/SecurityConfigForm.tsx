import React, { useState, useEffect } from 'react';
import {
  SecurityConfig,
  SecurityTemplate,
  CloudProvider,
  SecurityService,
  SecurityPolicy,
  ThreatPrevention,
  LoggingConfig
} from '../types';
import {
  getSecurityTemplates,
  createSecurityConfig,
  updateSecurityConfig
} from '../services/api';

interface SecurityConfigFormProps {
  config?: SecurityConfig;
  onSave: (config: SecurityConfig) => void;
  onCancel: () => void;
}

const SecurityConfigForm: React.FC<SecurityConfigFormProps> = ({
  config,
  onSave,
  onCancel
}) => {
  const [templates, setTemplates] = useState<SecurityTemplate[]>([]);
  const [formData, setFormData] = useState<Partial<SecurityConfig>>(
    config || {
      name: '',
      cloudProvider: 'azure',
      securityService: 'firewall',
      region: '',
      description: '',
      network: {
        zones: [],
        vnetId: '',
        subnetIds: []
      },
      securityPolicies: [],
      threatPrevention: {
        antivirus: true,
        antiSpyware: true,
        vulnerabilityProtection: true,
        urlFiltering: true,
        fileBlocking: true,
        dataFiltering: true
      },
      logging: {
        trafficLogs: true,
        threatLogs: true,
        systemLogs: true,
        auditLogs: true,
        logRetention: 30
      },
      compliance: {
        standards: [],
        status: 'non_compliant',
        lastCheck: new Date().toISOString(),
        issues: []
      }
    }
  );

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await getSecurityTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (config?.id) {
        const updatedConfig = await updateSecurityConfig(config.id, formData as SecurityConfig);
        onSave(updatedConfig);
      } else {
        const newConfig = await createSecurityConfig(formData as Omit<SecurityConfig, 'id' | 'status' | 'lastUpdated' | 'createdBy' | 'deploymentHistory'>);
        onSave(newConfig);
      }
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePolicyChange = (index: number, field: keyof SecurityPolicy, value: any) => {
    setFormData(prev => ({
      ...prev,
      securityPolicies: prev.securityPolicies?.map((policy, i) =>
        i === index ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const addPolicy = () => {
    setFormData(prev => ({
      ...prev,
      securityPolicies: [
        ...(prev.securityPolicies || []),
        {
          name: '',
          sourceZones: [],
          destinationZones: [],
          applications: [],
          services: [],
          action: 'allow',
          logging: true,
          description: ''
        }
      ]
    }));
  };

  const removePolicy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      securityPolicies: prev.securityPolicies?.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {config ? 'Edit Security Configuration' : 'New Security Configuration'}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cloudProvider" className="block text-sm font-medium text-gray-700">
                Cloud Provider
              </label>
              <select
                name="cloudProvider"
                id="cloudProvider"
                value={formData.cloudProvider}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="azure">Azure</option>
                <option value="aws">AWS</option>
                <option value="gcp">GCP</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="securityService" className="block text-sm font-medium text-gray-700">
                Security Service
              </label>
              <select
                name="securityService"
                id="securityService"
                value={formData.securityService}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="firewall">Firewall</option>
                <option value="security_group">Security Group</option>
                <option value="key_vault">Key Vault</option>
                <option value="sentinel">Sentinel</option>
                <option value="ngfw">NGFW</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <input
                type="text"
                name="region"
                id="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Security Policies</h3>
            <button
              type="button"
              onClick={addPolicy}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Policy
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {formData.securityPolicies?.map((policy, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Policy {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removePolicy(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={policy.name}
                      onChange={(e) => handlePolicyChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Action</label>
                    <select
                      value={policy.action}
                      onChange={(e) => handlePolicyChange(index, 'action', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="allow">Allow</option>
                      <option value="deny">Deny</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source Zones</label>
                    <input
                      type="text"
                      value={policy.sourceZones.join(', ')}
                      onChange={(e) => handlePolicyChange(index, 'sourceZones', e.target.value.split(',').map(z => z.trim()))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Zones</label>
                    <input
                      type="text"
                      value={policy.destinationZones.join(', ')}
                      onChange={(e) => handlePolicyChange(index, 'destinationZones', e.target.value.split(',').map(z => z.trim()))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Applications</label>
                    <input
                      type="text"
                      value={policy.applications.join(', ')}
                      onChange={(e) => handlePolicyChange(index, 'applications', e.target.value.split(',').map(a => a.trim()))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Services</label>
                    <input
                      type="text"
                      value={policy.services.join(', ')}
                      onChange={(e) => handlePolicyChange(index, 'services', e.target.value.split(',').map(s => s.trim()))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={policy.description}
                      onChange={(e) => handlePolicyChange(index, 'description', e.target.value)}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Prevention */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Threat Prevention</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            {Object.entries(formData.threatPrevention || {}).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={(e) => {
                    const newThreatPrevention = {
                      ...formData.threatPrevention,
                      [key]: e.target.checked
                    } as ThreatPrevention;
                    setFormData(prev => ({
                      ...prev,
                      threatPrevention: newThreatPrevention
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-3 text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logging Configuration */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Logging Configuration</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            {Object.entries(formData.logging || {}).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={(e) => {
                    const newLogging = {
                      ...formData.logging,
                      [key]: e.target.checked
                    } as LoggingConfig;
                    setFormData(prev => ({
                      ...prev,
                      logging: newLogging
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-3 text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {config ? 'Update' : 'Create'} Configuration
        </button>
      </div>
    </form>
  );
};

export default SecurityConfigForm; 