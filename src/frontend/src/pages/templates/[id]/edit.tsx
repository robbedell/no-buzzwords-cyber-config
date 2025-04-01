import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout/Layout';
import { Template } from '../../../services/api';

interface FormData {
  name: string;
  description: string;
  cloudProvider: string;
  securityService: string;
  tags: string[];
  configuration: Record<string, any>;
}

const EditTemplate: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    cloudProvider: 'aws',
    securityService: 'firewall',
    tags: [],
    configuration: {
      networkZones: [],
      threatPrevention: {
        enabled: true,
        features: []
      },
      logging: {
        enabled: true,
        level: 'info'
      }
    }
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/templates/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch template');
        }
        const data: Template = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
          cloudProvider: data.cloudProvider,
          securityService: data.securityService,
          tags: data.tags,
          configuration: data.configuration
        });
      } catch (err) {
        setError('Failed to load template');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update template');
      }

      router.push(`/templates/${id}`);
    } catch (err) {
      setError('Failed to update template. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error && !formData.name) {
    return (
      <Layout>
        <div className="px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
          <Link
            href="/templates"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Templates
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link
              href={`/templates/${id}`}
              className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Back to Template
            </Link>
            <h1 className="text-2xl font-semibold">Edit Template</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-md px-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  className="w-full border rounded-md px-3 py-2 h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the purpose and use case of this template"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cloud Provider
                  </label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.cloudProvider}
                    onChange={(e) => setFormData({ ...formData, cloudProvider: e.target.value })}
                  >
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Service
                  </label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.securityService}
                    onChange={(e) => setFormData({ ...formData, securityService: e.target.value })}
                  >
                    <option value="firewall">Next-Gen Firewall</option>
                    <option value="waf">Web Application Firewall</option>
                    <option value="ips">IPS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Network Zones
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Network zones will be configured when using this template
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.configuration.threatPrevention.enabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        threatPrevention: {
                          ...formData.configuration.threatPrevention,
                          enabled: e.target.checked
                        }
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Threat Prevention</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.configuration.logging.enabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        logging: {
                          ...formData.configuration.logging,
                          enabled: e.target.checked
                        }
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Logging</span>
                </label>
                {formData.configuration.logging.enabled && (
                  <select
                    className="mt-2 w-full border rounded-md px-3 py-2"
                    value={formData.configuration.logging.level}
                    onChange={(e) => setFormData({
                      ...formData,
                      configuration: {
                        ...formData.configuration,
                        logging: {
                          ...formData.configuration.logging,
                          level: e.target.value
                        }
                      }
                    })}
                  >
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warn">Warning</option>
                    <option value="error">Error</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href={`/templates/${id}`}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditTemplate; 