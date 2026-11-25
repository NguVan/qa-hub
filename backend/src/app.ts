import express from "express";
import { testCases } from "./data/test-cases.ts";   // ← thêm
import { getSummary } from "./utils/summary.ts";    // ← thêm

export const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "OK",
    data: { status: "up", uptime: process.uptime() },
  });
});

app.get("/api/summary", (_req, res) => {
  const summary = getSummary(testCases);
  res.json({
    success: true,
    message: "OK",
    data: summary,
  });
});
app.get("/api/test-cases", (_req, res) => {
  res.json({ success: true, message: "OK", data: testCases });
});

app.get("/api/test-cases/:testCaseId", (req, res) => {
  /*const id = Number(req.params.testCaseId);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "testCaseId must be a positive integer",
    });
    return;
  }
    */
   const rawId = req.params.testCaseId;

  if (!/^[1-9]\d*$/.test(rawId)) {
    res.status(400).json({
      success: false,
      message: "testCaseId must be a positive integer",
    });
    return;
  }

  const id = Number(rawId);

  const testCase = testCases.find((tc) => tc.id === id);
  if (!testCase) {
    res.status(404).json({ success: false, message: `Test case ${id} not found` });
    return;
  }

  res.json({ success: true, message: "OK", data: testCase });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});
/*
Dòng	Ý nghĩa
import express from "express"	Default import: thư viện Express export một hàm chính, nên không có { }. (Mình chỉ nói “ưu tiên named export” cho code của mình, còn thư viện bên ngoài export kiểu nào thì import theo kiểu đó)
express()	Gọi hàm để tạo ra một app
app.use(express.json())	Đăng ký middleware: một hàm chạy trước mọi route. Hàm này đọc body JSON của request và chuyển thành object trong req.body. Cần cho POST/PATCH ở các bài sau. Middleware sẽ học kỹ ở bài 1.7
app.get(path, handler)	Đăng ký route GET /api/health
_req	Tham số không dùng tới. Dấu _ đầu tên là quy ước nghĩa là “cố ý bỏ qua”
res.json({...})	Trả về body JSON. Express tự đặt status 200 và header Content-Type: application/json
process.uptime()	Số giây server đã chạy. process là object toàn cục của Node, có kiểu nhờ @types/node

Response theo đúng khung { success, message, data } trong API-DESIGN.md.
*/ 