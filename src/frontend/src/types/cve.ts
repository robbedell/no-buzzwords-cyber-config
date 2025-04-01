export interface CVE {
  id: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  publishedDate: string;
  affectedProducts: string[];
  recommendedConfigs: CVERecommendedConfig[];
}

export interface CVERecommendedConfig {
  type: 'palo_alto' | 'terraform' | 'ansible';
  description: string;
  config: string;
  bestPractices: string[];
}

export interface CVEQuery {
  query?: string;
  cveId?: string;
  product?: string;
  description?: string;
  severity?: 'high' | 'medium' | 'low';
}

export interface SecurityRecommendation {
  id: string;
  type: 'palo_alto' | 'terraform' | 'ansible';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  relatedCVEs: string[];
  config: string;
  bestPractices: string[];
} 