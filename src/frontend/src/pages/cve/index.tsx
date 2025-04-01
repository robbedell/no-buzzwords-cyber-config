import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { CVE, searchCVE } from '../../services/api';

const CVEOverview: React.FC = () => {
  const [cves, setCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    severity: 'all',
    search: '',
    product: 'all'
  });

  useEffect(() => {
    const fetchCVEs = async () => {
      try {
        const data = await searchCVE({});
        setCves(data);
      } catch (err) {
        setError('Failed to fetch CVEs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCVEs();
  }, []);

  const filteredCVEs = cves.filter((cve) => {
    const matchesSeverity = filter.severity === 'all' || cve.severity === filter.severity;
    const matchesSearch = filter.search === '' || 
      cve.id.toLowerCase().includes(filter.search.toLowerCase()) ||
      cve.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesProduct = filter.product === 'all' || 
      cve.affectedProducts.some(product => product.toLowerCase().includes(filter.product.toLowerCase()));
    
    return matchesSeverity && matchesSearch && matchesProduct;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">CVE Database</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and search Common Vulnerabilities and Exposures
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity
              </label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={filter.severity}
                onChange={(e) => setFilter({ ...filter, severity: e.target.value })}
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={filter.product}
                onChange={(e) => setFilter({ ...filter, product: e.target.value })}
              >
                <option value="all">All Products</option>
                <option value="palo">Palo Alto Networks</option>
                <option value="cisco">Cisco</option>
                <option value="juniper">Juniper</option>
                <option value="fortinet">Fortinet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Search by CVE ID or description..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading CVEs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CVE ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affected Products
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCVEs.map((cve) => (
                    <tr key={cve.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/cve/${cve.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {cve.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{cve.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(cve.severity)}`}>
                          {cve.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(cve.publishedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cve.affectedProducts.map((product, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CVEOverview; 