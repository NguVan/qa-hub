import type { Summary, TestCase } from "../types/test-case.ts";
import { testCases } from "../data/test-cases.ts";
import { getSummary } from "../utils/summary.ts";

export const listTestCases = (): TestCase[] => testCases;

export const findTestCaseById = (id: number): TestCase | undefined =>
  testCases.find((tc) => tc.id === id);

export const getTestCaseSummary = (): Summary => getSummary(testCases);