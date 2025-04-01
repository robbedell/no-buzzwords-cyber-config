import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SecurityPolicy } from '@/types';

export default function NewSecurityPolicy() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SecurityPolicy>>({
    name: '',
    description: '',
    sourceZones: [],
    destinationZones: [],
    applications: [],
    services: [],
    action: 'allow',
    logging: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === 'sourceZones' || name === 'destinationZones' || name === 'applications' || name === 'services') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim())
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call once implemented
      console.log('Creating policy:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/security/policies');
    } catch (err) {
      console.error('Error creating policy:', err);
      setError(err instanceof Error ? err.message : 'Failed to create security policy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center">
          <Link
            href="/security/policies"
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Security Policy</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Policy Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                  Action
                </label>
                <select
                  name="action"
                  id="action"
                  required
                  value={formData.action}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="allow">Allow</option>
                  <option value="deny">Deny</option>
                </select>
              </div>

              <div>
                <label htmlFor="sourceZones" className="block text-sm font-medium text-gray-700">
                  Source Zones (comma-separated)
                </label>
                <input
                  type="text"
                  name="sourceZones"
                  id="sourceZones"
                  required
                  value={formData.sourceZones?.join(', ')}
                  onChange={handleInputChange}
                  placeholder="trust, internal, dmz"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="destinationZones" className="block text-sm font-medium text-gray-700">
                  Destination Zones (comma-separated)
                </label>
                <input
                  type="text"
                  name="destinationZones"
                  id="destinationZones"
                  required
                  value={formData.destinationZones?.join(', ')}
                  onChange={handleInputChange}
                  placeholder="untrust, external, internet"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="applications" className="block text-sm font-medium text-gray-700">
                  Applications (comma-separated)
                </label>
                <input
                  type="text"
                  name="applications"
                  id="applications"
                  required
                  value={formData.applications?.join(', ')}
                  onChange={handleInputChange}
                  placeholder="web-browsing, ssl, ssh"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  name="services"
                  id="services"
                  required
                  value={formData.services?.join(', ')}
                  onChange={handleInputChange}
                  placeholder="tcp/443, tcp/80, tcp/22"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="logging"
                  id="logging"
                  checked={formData.logging}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="logging" className="ml-2 block text-sm text-gray-900">
                  Enable Logging
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/security/policies"
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Policy'}
          </button>
        </div>
      </form>
    </div>
  );
} 