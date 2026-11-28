import { Schema, model, type InferSchemaType } from "mongoose";
import { PRIORITIES, STATUSES } from "../types/test-case.ts";

const testCaseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    priority: { type: String, enum: PRIORITIES, required: true },
    status: { type: String, enum: STATUSES, default: "New" },
  },
  { timestamps: true },
);

export type TestCaseDoc = InferSchemaType<typeof testCaseSchema>;

export const TestCaseModel = model("TestCase", testCaseSchema);