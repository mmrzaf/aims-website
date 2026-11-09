/** Grouping and icons used by the Solutions menu. */
export interface SolutionMenuGroup { key: 'plant' | 'business' | 'organisation'; tone: 'blue' | 'teal' | 'amber'; ids: string[] }

export const solutionMenu: SolutionMenuGroup[] = [
  { key: 'plant', tone: 'blue', ids: ['maintenance-reliability', 'asset-management', 'production-operations', 'quality-laboratory', 'safety-environment'] },
  { key: 'business', tone: 'teal', ids: ['procurement-sourcing', 'inventory-warehouse-logistics', 'sales-customer-management', 'finance-planning'] },
  { key: 'organisation', tone: 'amber', ids: ['workforce-people', 'process-automation-integration', 'data-analytics-intelligence', 'governance-risk-compliance', 'documents-records-knowledge'] },
];

export const solutionIcons: Record<string, string> = {
  'maintenance-reliability': 'wrench',
  'asset-management': 'cube',
  'production-operations': 'factory',
  'quality-laboratory': 'flask',
  'safety-environment': 'shield',
  'procurement-sourcing': 'cart',
  'inventory-warehouse-logistics': 'truck',
  'sales-customer-management': 'trend',
  'finance-planning': 'card',
  'workforce-people': 'people',
  'process-automation-integration': 'flow',
  'data-analytics-intelligence': 'database',
  'governance-risk-compliance': 'checkdoc',
  'documents-records-knowledge': 'folder',
};
