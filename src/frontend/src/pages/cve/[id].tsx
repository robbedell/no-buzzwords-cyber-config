import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CVE, getCVERecommendations } from '../../services/api';

const CVEDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cve, setCVE] = useState<CVE | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCVE = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/cve/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch CVE');
        }
        const data = await response.json();
        setCVE(data);

        // Fetch recommendations
        const recs = await getCVERecommendations(id as string);
        setRecommendations(recs.recommendations);
      } catch (err) {
        setError('Failed to load CVE details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCVE();
  }, [id]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !cve) {
    return (
      <div className="px-6 py-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error || 'CVE not found'}</p>
        </div>
        <Link
          href="/cve"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to CVE Database
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/cve"
            className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
          >
            ← Back to CVE Database
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">{cve.id}</h1>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(cve.severity)}`}>
              {cve.severity}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Description</h2>
            <p className="text-gray-600">{cve.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Affected Products</h2>
            <div className="flex flex-wrap gap-2">
              {cve.affectedProducts.map((product, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Recommended Configurations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{rec.title}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      <code>{rec.config}</code>
                    </pre>
                  </div>
                  {rec.bestPractices.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Best Practices:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {rec.bestPractices.map((practice: string, i: number) => (
                          <li key={i}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">CVE Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Published Date</h3>
                <p className="mt-1">{new Date(cve.publishedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Severity</h3>
                <p className="mt-1 capitalize">{cve.severity}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Affected Products</h3>
                <p className="mt-1">{cve.affectedProducts.length} products</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Recommended Configurations</h3>
                <p className="mt-1">{recommendations.length} configurations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Related Resources</h2>
            <div className="space-y-2">
              <a
                href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800"
              >
                NVD Database Entry
              </a>
              <a
                href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800"
              >
                MITRE CVE Entry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEDetail; 