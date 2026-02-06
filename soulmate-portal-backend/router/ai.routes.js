import express from "express";
import { dreamChat } from "../controllers/aiChat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/ai/chat", authenticate, dreamChat);

export default router;
