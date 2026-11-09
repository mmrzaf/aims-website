/**
 * Image slots. A slot is a path under public/images without size suffix or
 * extension (e.g. "industries/energy" is public/images/industries/energy-1200.webp).
 * A slot without a file renders a neutral placeholder.
 */
export const heroImage = 'home/hero';

export const industryImages: Record<string, string> = {
  manufacturing: 'industries/manufacturing',
  'oil-gas': 'industries/oil-gas',
  energy: 'industries/energy',
  'mining-metals': 'industries/mining-metals',
  construction: 'industries/construction',
  'food-agriculture': 'industries/food-agriculture',
  healthcare: 'industries/healthcare',
  logistics: 'industries/logistics',
};

export const groupImages: Record<string, string> = {
  industrial: 'groups/industrial',
  business: 'groups/business',
  corporate: 'groups/corporate',
  data: 'groups/data',
};

export const platformImages = {
  baseAndModules: 'platform/base-and-modules',
  integrationHub: 'platform/integration-hub',
  deployment: 'platform/deployment',
} as const;

/** Interface illustration used on a product page, by product id. */
export const productInterfaces: Record<string, string> = {
  erp: 'interfaces/operations', mes: 'interfaces/operations', aps: 'interfaces/operations', plm: 'interfaces/operations',
  cmms: 'interfaces/maintenance', facilities: 'interfaces/maintenance',
  'e-procurement': 'interfaces/procurement', 'e-sourcing': 'interfaces/procurement', rfq: 'interfaces/procurement',
  srm: 'interfaces/procurement', 'supplier-portal': 'interfaces/procurement', clm: 'interfaces/procurement',
  'spend-management': 'interfaces/procurement', scm: 'interfaces/procurement',
  bi: 'interfaces/analytics', 'industrial-analytics': 'interfaces/analytics', oee: 'interfaces/analytics', 'digital-twin': 'interfaces/analytics',
  historian: 'interfaces/analytics', iiot: 'interfaces/analytics',
  qms: 'interfaces/quality', lims: 'interfaces/quality',
  wms: 'interfaces/warehouse', tms: 'interfaces/warehouse', oms: 'interfaces/warehouse',
  hcm: 'interfaces/people', ats: 'interfaces/people', payroll: 'interfaces/people', wfm: 'interfaces/people', lms: 'interfaces/people',
  dms: 'interfaces/documents', ecm: 'interfaces/documents', bpm: 'interfaces/documents', records: 'interfaces/documents',
  'case-management': 'interfaces/documents', 'workflow-automation': 'interfaces/documents',
  crm: 'interfaces/sales', cpq: 'interfaces/sales', 'b2b-commerce': 'interfaces/sales',
  'b2b-marketplace': 'interfaces/sales', 'partner-management': 'interfaces/sales', 'customer-portal': 'interfaces/sales',
  ipaas: 'interfaces/integration', mdm: 'interfaces/integration', 'operational-data-platform': 'interfaces/integration',
  dwh: 'interfaces/integration', 'process-mining': 'interfaces/integration',
  epm: 'interfaces/performance',
  ppm: 'interfaces/projects', psa: 'interfaces/projects',
  itsm: 'interfaces/it-services', itam: 'interfaces/it-services', iam: 'interfaces/it-services',
  grc: 'interfaces/governance', audit: 'interfaces/governance',
  eam: 'interfaces/assets', apm: 'interfaces/assets',
  ems: 'interfaces/sustainability', ehs: 'interfaces/sustainability',
};
