import type { TestCase } from "./types/test-case.ts";
import { getSummary } from "./utils/summary.ts";

const testCases: TestCase[] = [
  { id: 1, title: "Login with valid account", priority: "High", status: "Pass" },
  { id: 2, title: "Login with wrong password", priority: "High", status: "Fail" },
  { id: 3, title: "Reset password", priority: "Medium", status: "Pass" },
  { id: 4, title: "Update profile avatar", priority: "Low", status: "Blocked" },
  { id: 5, title: "Logout", priority: "Medium", status: "Pass" },
];

console.log("QA Hub backend started");
console.log(getSummary(testCases));