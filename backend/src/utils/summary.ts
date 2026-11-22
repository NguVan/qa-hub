import type { Summary, TestCase } from "../types/test-case.ts";
import { calcRate } from "./rate.ts";

export const getSummary = (cases: TestCase[]): Summary => {
  const total = cases.length;
  const passed = cases.filter((tc) => tc.status === "Pass").length;
  const failed = cases.filter((tc) => tc.status === "Fail").length;
  const blocked = cases.filter((tc) => tc.status === "Blocked").length;

  return { total, passed, failed, blocked, passRate: calcRate(passed, total) };
};