export type Status = "New" | "Pass" | "Fail" | "Blocked";
export type Priority = "High" | "Medium" | "Low";

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