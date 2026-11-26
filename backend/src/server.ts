import { app } from "./app.ts";
import { connectDB } from "./config/db.ts";

const PORT = Number(process.env.PORT ?? 3000);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI. Did you create backend/.env?");
  process.exit(1);
}

try {
  await connectDB(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`QA Hub API running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("❌ Cannot connect to MongoDB:", error);
  process.exit(1);
}