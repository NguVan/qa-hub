export const STATUSES = ["New", "Pass", "Fail", "Blocked"] as const;
export const PRIORITIES = ["High", "Medium", "Low"] as const;

export type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface TestCase {
  id: number;
  title: string;
  priority: Priority;
  status: Status;
}

export interface Summary {
  total: number;
  passed: number;
  failed: number;
  blocked: number;
  passRate: number;
}