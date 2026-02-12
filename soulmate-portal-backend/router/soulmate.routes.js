import express from "express";
import { createOrGetSoulmate, getUserSoulmate, deleteSoulmate } from "../controllers/soulmate.controller.js";
import { chatWithSoulmate } from "../controllers/soulmateChat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/soulmate/create", authenticate, createOrGetSoulmate);
router.get("/soulmate/my-soulmate", authenticate, getUserSoulmate);
router.delete("/soulmate/delete", authenticate, deleteSoulmate);
router.post("/soulmate/chat", authenticate, chatWithSoulmate);

export default router;