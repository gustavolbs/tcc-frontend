export interface FeatureFlag {
  id: number;
  slug: string;
  description: string;
  status: boolean;
}

export enum FFS {
  CONVERSATIONS = "conversations",
  UNLIMITED_MANAGERS = "unlimited-managers",
  ISSUES_REPORT_CHART = "issues-report-chart",
  DASHBOARD_MAP_MARKERS = "dashboard-map-markers",

  POLICE_REPORT = "police-report",
  POLICE_REPORT_CHART = "police-report-chart",
}
