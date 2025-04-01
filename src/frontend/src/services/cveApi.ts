import axios from 'axios';
import { CVE, CVEQuery, SecurityRecommendation } from '../types/cve';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchCVE = async (query: CVEQuery): Promise<CVE[]> => {
  const response = await api.get('/cve/search', { params: query });
  return response.data;
};

export const getCVE = async (id: string): Promise<CVE> => {
  const response = await api.get(`/cve/${id}`);
  return response.data;
};

export const getCVERecommendations = async (id: string): Promise<{ recommendations: SecurityRecommendation[] }> => {
  const response = await api.get(`/cve/${id}/recommendations`);
  return response.data;
};

export const getSecurityRecommendations = async (): Promise<SecurityRecommendation[]> => {
  const response = await api.get('/recommendations');
  return response.data;
}; 