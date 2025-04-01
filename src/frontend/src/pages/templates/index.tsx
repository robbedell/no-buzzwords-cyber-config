import React from 'react';
import Link from 'next/link';
import { getTemplates } from '../../services/api';
import type { Template } from '../../services/api';

interface TagProps {
  tag: string;
  index: number;
}

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const renderTag = ({ tag, index }: TagProps) => (
    <span
      key={index}
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
    >
      {tag}
    </span>
  );

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Security Templates</h1>
        <Link
          href="/templates/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Template
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {templates.map((template) => (
              <li key={template.id}>
                <Link href={`/templates/${template.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-600 truncate">{template.name}</p>
                        <p className="mt-2 text-sm text-gray-600">{template.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {template.cloudProvider}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex space-x-2">
                        {template.tags.map((tag, index) => renderTag({ tag, index }))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Last updated: {new Date(template.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage; 