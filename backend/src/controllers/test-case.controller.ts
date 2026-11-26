import type { Request, Response } from "express";
import * as testCaseService from "../services/test-case.service.ts";

export const getAllTestCases = (_req: Request, res: Response): void => {
  res.json({ success: true, message: "OK", data: testCaseService.listTestCases() });
};

export const getTestCaseSummary = (_req: Request, res: Response): void => {
  res.json({ success: true, message: "OK", data: testCaseService.getTestCaseSummary() });
};

export const getTestCaseById = (req: Request, res: Response): void => {
  const rawId = req.params.testCaseId;

  if (typeof rawId !== "string" || !/^[1-9]\d*$/.test(rawId)) {
    res.status(400).json({ success: false, message: "testCaseId must be a positive integer" });
    return;
  }

  const id = Number(rawId);
  const testCase = testCaseService.findTestCaseById(id);

  if (!testCase) {
    res.status(404).json({ success: false, message: `Test case ${id} not found` });
    return;
  }

  res.json({ success: true, message: "OK", data: testCase });
};