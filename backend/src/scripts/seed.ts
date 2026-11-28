import mongoose from "mongoose";
import { connectDB } from "../config/db.ts";
import { TestCaseModel } from "../models/test-case.model.ts";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI");
  process.exit(1);
}

const sampleTestCases = [
  { title: "Login with valid account", priority: "High", status: "Pass" },
  { title: "Login with wrong password", priority: "High", status: "Fail" },
  { title: "Reset password", priority: "Medium", status: "Pass" },
  { title: "Update profile avatar", priority: "Low", status: "Blocked" },
  { title: "Logout", priority: "Medium" },
];

await connectDB(MONGODB_URI);

await TestCaseModel.deleteMany({});
const created = await TestCaseModel.insertMany(sampleTestCases);
console.log(`✅ Seeded ${created.length} test cases`);

await mongoose.disconnect();