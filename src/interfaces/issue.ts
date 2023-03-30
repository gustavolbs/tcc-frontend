export interface IssueInput {
  cityId: number;
  latitude: number;
  longitude: number;
  category: string;
  description: string;
  date: Date;
  reporterId: number;
}

export interface Issue {
  id: number;
  status: string;
  cityId: number;
  latitude: number;
  longitude: number;
  category: string;
  description: string;
  date: Date;
  reporterId: number;
  fiscalId: number;
  managerId: number;
  createdAt: Date;
  updatedAt: Date;
  reporter?: UserInfo;
  fiscal?: UserInfo;
  manager?: UserInfo;
}

interface UserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
}
