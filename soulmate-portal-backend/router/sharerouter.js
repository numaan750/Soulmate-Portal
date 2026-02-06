import express from "express";
import {
  createShareableLink,
  getSharedContent,
  getUserSharedContent,
  deleteSharedContent,
} from "../controllers/sharecontroller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/share/create", authenticate, createShareableLink);
router.get("/share/my-shares", authenticate, getUserSharedContent);
router.delete("/share/:slug", authenticate, deleteSharedContent);

router.get("/share/:slug", getSharedContent);

export default router;