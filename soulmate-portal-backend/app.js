import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "./config/passport.config.js";
import loginrouter from "./router/loginrouter.js";
import aiRoutes from "./router/ai.routes.js";
import sharerouter from "./router/sharerouter.js";
import authRoutes from "./router/auth.routes.js";
import soulmateRoutes from "./router/soulmate.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", loginrouter);
app.use("/api/auth", authRoutes);
app.use("/api", aiRoutes);
app.use("/api", sharerouter);
app.use("/api", soulmateRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Soulmate Backend is running");
});

export default app;
