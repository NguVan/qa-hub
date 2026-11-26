import { Router } from "express";
import {
  getAllTestCases,
  getTestCaseById,
  getTestCaseSummary,
} from "../controllers/test-case.controller.ts";

export const testCaseRouter = Router();

testCaseRouter.get("/", getAllTestCases);
testCaseRouter.get("/summary", getTestCaseSummary);
testCaseRouter.get("/:testCaseId", getTestCaseById);