import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { getTemplates, Template } from '../../services/api';

const TemplatesOverview: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    provider: 'all',
    service: 'all',
    search: '',
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Failed to fetch templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesProvider = filter.provider === 'all' || template.cloudProvider.toLowerCase() === filter.provider;
    const matchesService = filter.service === 'all' || template.securityService.toLowerCase() === filter.service;
    const matchesSearch = filter.search === '' || 
      template.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      template.description.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesProvider && matchesService && matchesSearch;
  });

  return (
    <Layout>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Security Templates</h1>
          <Link
            href="/templates/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Template
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cloud Provider
              </label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={filter.provider}
                onChange={(e) => setFilter({ ...filter, provider: e.target.value })}
              >
                <option value="all">All Providers</option>
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
                value={filter.service}
                onChange={(e) => setFilter({ ...filter, service: e.target.value })}
              >
                <option value="all">All Services</option>
                <option value="firewall">Next-Gen Firewall</option>
                <option value="waf">Web Application Firewall</option>
                <option value="ips">IPS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Search templates..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading templates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Link
                  key={template.id}
                  href={`/templates/${template.id}`}
                  className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{template.cloudProvider} • {template.securityService}</span>
                    <span>{template.usageCount} uses</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesOverview; 