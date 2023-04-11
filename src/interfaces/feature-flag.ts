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

  POLICE_REPORT = "police-report",
  POLICE_REPORT_CHART = "police-report-chart",
}
