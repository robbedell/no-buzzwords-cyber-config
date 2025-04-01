import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ComplianceStatus {
  overallScore: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  issues: Array<{
    id: string;
    title: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
    status: 'open' | 'in_progress' | 'resolved';
  }>;
}

export default function CompliancePage() {
  const [status, setStatus] = useState<ComplianceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplianceStatus = async () => {
      try {
        const response = await fetch('/api/compliance/status');
        if (!response.ok) {
          throw new Error('Failed to fetch compliance status');
        }
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComplianceStatus();
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

  if (!status) {
    return (
      <div className="p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No compliance data available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Compliance Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Current compliance score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center mb-4">{status.overallScore}%</div>
            <Progress value={status.overallScore} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passed Checks</CardTitle>
            <CardDescription>Successfully completed checks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-green-600 mb-4">
              {status.passedChecks}
            </div>
            <div className="text-sm text-center text-gray-500">
              out of {status.totalChecks} total checks
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Failed Checks</CardTitle>
            <CardDescription>Checks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-red-600 mb-4">
              {status.failedChecks}
            </div>
            <div className="text-sm text-center text-gray-500">
              out of {status.totalChecks} total checks
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Issues</CardTitle>
          <CardDescription>Current issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {status.issues.map((issue) => (
              <Alert
                key={issue.id}
                variant={issue.severity === 'high' ? 'destructive' : issue.severity === 'medium' ? 'default' : 'secondary'}
              >
                {issue.severity === 'high' ? (
                  <XCircle className="h-4 w-4" />
                ) : issue.severity === 'medium' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertTitle>{issue.title}</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">{issue.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Status:</span>
                    <span className="capitalize">{issue.status.replace('_', ' ')}</span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 