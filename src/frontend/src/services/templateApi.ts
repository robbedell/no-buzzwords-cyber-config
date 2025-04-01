import axios from 'axios';
import { Template } from '../types/template';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTemplates = async (): Promise<Template[]> => {
  const response = await api.get('/templates');
  return response.data;
};

export const getTemplate = async (id: string): Promise<Template> => {
  const response = await api.get(`/templates/${id}`);
  return response.data;
};

export const createTemplate = async (template: Omit<Template, 'id' | 'usageCount' | 'lastUpdated' | 'createdBy'>): Promise<Template> => {
  const response = await api.post('/templates', template);
  return response.data;
};

export const updateTemplate = async (id: string, template: Partial<Template>): Promise<Template> => {
  const response = await api.put(`/templates/${id}`, template);
  return response.data;
};

export const deleteTemplate = async (id: string): Promise<void> => {
  await api.delete(`/templates/${id}`);
}; 