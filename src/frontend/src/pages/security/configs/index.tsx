import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { getSecurityConfigs } from '@/services/api';
import type { SecurityConfig } from '@/types';
import Link from 'next/link';

export default function SecurityConfigsPage() {
  const [configs, setConfigs] = useState<SecurityConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const data = await getSecurityConfigs();
        // Transform the data to match our frontend interface
        const transformedData = data.map((config: any) => ({
          id: config._id,
          name: config.name,
          description: config.description,
          cloudProvider: config.cloudProvider,
          securityService: config.securityService,
          region: config.region,
          status: config.status,
          networkZones: config.networkZones,
          threatPrevention: config.threatPrevention,
          logging: config.logging,
          compliance: config.compliance,
          deploymentHistory: config.deploymentHistory,
          lastUpdated: config.lastUpdated
        }));
        setConfigs(transformedData);
      } catch (err) {
        console.error('Error fetching configs:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching security configurations');
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
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
        <h1 className="text-3xl font-bold">Security Configurations</h1>
        <Link
          href="/security/configs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Config
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map((config) => (
          <Card key={config.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{config.name}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cloud Provider:</span>
                  <span className="font-medium">{config.cloudProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Security Service:</span>
                  <span className="font-medium">{config.securityService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Region:</span>
                  <span className="font-medium">{config.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Network Zones:</span>
                  <span className="font-medium">{config.networkZones?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Threat Prevention:</span>
                  <span className={`font-medium ${config.threatPrevention?.vulnerabilityProtection ? 'text-green-600' : 'text-red-600'}`}>
                    {config.threatPrevention?.vulnerabilityProtection ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Logging:</span>
                  <span className={`font-medium ${config.logging?.trafficLogs ? 'text-green-600' : 'text-red-600'}`}>
                    {config.logging?.trafficLogs ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Compliance:</span>
                  <span className={`font-medium ${config.compliance?.status === 'compliant' ? 'text-green-600' : 'text-red-600'}`}>
                    {config.compliance?.status || 'Unknown'}
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