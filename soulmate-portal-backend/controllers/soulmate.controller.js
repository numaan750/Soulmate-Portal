import Soulmate from "../models/Soulmate.model.js";
import User from "../models/login.js";
import { generateSoulmateImage } from "../utils/imageGenerator.js";
import {
  calculateCompatibility,
  generateInsights,
} from "../utils/compatibility.js";

export const createOrGetSoulmate = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingSoulmate = await Soulmate.findOne({ userId });
    if (existingSoulmate) {
      return res.status(200).json({
        status: "success",
        data: existingSoulmate,
        message: "Soulmate already exists",
      });
    }

    const { gender, birthDate, ethnicBackground, vibe, birthplace, birthTime } =
      req.body;
    if (
      !gender ||
      !birthDate ||
      !ethnicBackground ||
      !vibe ||
      !birthplace ||
      !birthTime
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    const user = await User.findById(userId);

    if (!user.isPremium && user.soulmateCredits <= 0) {
      return res.status(403).json({
        status: "error",
        message: "premium_required",
        needsPremium: true,
      });
    }

    const imageUrl = await generateSoulmateImage({
      gender,
      ethnicBackground,
      vibe,
      sketchStyle: "realistic",
    });
    const compatibilityScore = calculateCompatibility(birthDate, birthTime);
    const insights = generateInsights(compatibilityScore, vibe);
    const soulmate = await Soulmate.create({
      userId,
      gender,
      birthDate,
      ethnicBackground,
      vibe,
      birthplace,
      birthTime,
      imageUrl,
      compatibilityScore,
      ...insights,
    });
    if (!user.isPremium) {
      user.soulmateCredits -= 1;
      await user.save();
    }

    res.status(201).json({
      status: "success",
      data: soulmate,
      creditsRemaining: user.soulmateCredits,
    });
  } catch (error) {
    console.error("Create soulmate error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserSoulmate = async (req, res) => {
  try {
    const soulmate = await Soulmate.findOne({ userId: req.user._id });

    if (!soulmate) {
      return res.status(404).json({
        status: "error",
        message: "No soulmate found",
      });
    }

    res.json({
      status: "success",
      data: soulmate,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteSoulmate = async (req, res) => {
  try {
    const soulmate = await Soulmate.findOneAndDelete({ userId: req.user._id });

    if (!soulmate) {
      return res.status(404).json({
        status: "error",
        message: "No soulmate found to delete",
      });
    }

    res.json({
      status: "success",
      message: "Soulmate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
