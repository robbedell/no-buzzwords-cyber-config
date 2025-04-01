import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, FileKey, AlertTriangle, CheckCircle } from 'lucide-react';

const SecurityPage = () => {
  const sections = [
    {
      title: 'Security Configurations',
      description: 'Manage and monitor security configurations across your cloud infrastructure',
      icon: Shield,
      href: '/security/configs',
      color: 'text-blue-600',
    },
    {
      title: 'CVE Management',
      description: 'Track and respond to Common Vulnerabilities and Exposures',
      icon: AlertTriangle,
      href: '/cve',
      color: 'text-yellow-600',
    },
    {
      title: 'Compliance',
      description: 'Monitor compliance status and address security standards',
      icon: CheckCircle,
      href: '/compliance',
      color: 'text-green-600',
    },
    {
      title: 'Security Policies',
      description: 'Define and manage security policies and guidelines',
      icon: FileKey,
      href: '/security/policies',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Overview</h1>
        <p className="mt-2 text-gray-600">
          Manage and monitor your security configurations, vulnerabilities, and compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className={`${section.color} p-2 rounded-lg bg-opacity-10 bg-current`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription className="mt-1">{section.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900">Security Status</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Active Configurations</div>
            <div className="mt-1 text-2xl font-semibold">12</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Open CVEs</div>
            <div className="mt-1 text-2xl font-semibold">3</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Compliance Score</div>
            <div className="mt-1 text-2xl font-semibold">94%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage; 