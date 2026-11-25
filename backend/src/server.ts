import { app } from "./app.ts";

const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, () => {
  console.log(`QA Hub API running at http://localhost:${PORT}`);
});
/*
Dòng	              Ý nghĩa
process.env.PORT	Đọc biến môi trường PORT. Server thật (như Render ở Giai đoạn 6) sẽ tự cấp cổng qua biến này
?? 3000	Không có biến môi trường thì dùng cổng 3000 mặc định (toán tử ??, bài 0.6B)
Number(...)	Biến môi trường luôn là chuỗi ("8080"), nên phải chuyển sang số
app.listen(PORT, callback)	Bắt đầu lắng nghe ở cổng đó. Callback chạy một lần khi server sẵn sàng
*/