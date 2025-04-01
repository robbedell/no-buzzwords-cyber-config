import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { SecurityPolicy } from '@/types';

export default function SecurityPoliciesPage() {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // TODO: Replace with actual API call once implemented
        const mockPolicies: SecurityPolicy[] = [
          {
            name: 'Web Access Policy',
            sourceZones: ['trust'],
            destinationZones: ['untrust'],
            applications: ['web-browsing', 'ssl'],
            services: ['tcp/443', 'tcp/80'],
            action: 'allow',
            logging: true,
            description: 'Allow web access from trusted to untrusted zones'
          },
          {
            name: 'Database Access Policy',
            sourceZones: ['app'],
            destinationZones: ['db'],
            applications: ['postgresql', 'mysql'],
            services: ['tcp/5432', 'tcp/3306'],
            action: 'allow',
            logging: true,
            description: 'Allow database access from application to database zones'
          }
        ];
        setPolicies(mockPolicies);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching security policies');
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Security Policies</h1>
        <Link
          href="/security/policies/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Policy
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy) => (
          <Card key={policy.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{policy.name}</CardTitle>
              <CardDescription>{policy.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Action:</span>
                  <span className={`font-medium ${
                    policy.action === 'allow' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {policy.action.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Source Zones:</span>
                  <span className="font-medium">{policy.sourceZones.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination Zones:</span>
                  <span className="font-medium">{policy.destinationZones.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Applications:</span>
                  <span className="font-medium">{policy.applications.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Services:</span>
                  <span className="font-medium">{policy.services.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Logging:</span>
                  <span className={`font-medium ${
                    policy.logging ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {policy.logging ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 