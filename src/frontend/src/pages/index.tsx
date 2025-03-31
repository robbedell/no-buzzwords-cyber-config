import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Security Configuration Platform
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to the Security Configuration Platform. This platform helps security teams manage, validate, and generate security configurations across different vendors while incorporating CVE data for enhanced security.
        </p>
      </main>
    </div>
  );
};

export default Home; 