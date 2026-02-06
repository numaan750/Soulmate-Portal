import SharedContent from "../models/sharedContent.js";
import crypto from "crypto";

const generateSlug = () => {
  return crypto.randomBytes(8).toString("hex");
};

export const createShareableLink = async (req, res) => {
  try {
    const {
      imageUrl,
      title,
      description,
      compatibilityScore,
      birthDate,
      ethnicity,
      personality,
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        status: "error",
        message: "Image URL is required",
      });
    }

    const uniqueSlug = generateSlug();

    const sharedContent = await SharedContent.create({
      userId: req.user._id,
      imageUrl,
      title: title || "My Soulmate Sketch",
      description: description || "Check out my soulmate compatibility reading!",
      compatibilityScore,
      birthDate,
      ethnicity,
      personality,
      uniqueSlug,
    });

    const shareUrl = `${process.env.FRONTEND_URL}/share/${uniqueSlug}`;

    res.status(201).json({
      status: "success",
      message: "Shareable link created successfully",
      data: {
        shareUrl,
        slug: uniqueSlug,
        sharedContent,
      },
    });
  } catch (error) {
    console.error("Create share link error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSharedContent = async (req, res) => {
  try {
    const { slug } = req.params;

    const sharedContent = await SharedContent.findOne({
      uniqueSlug: slug,
    }).populate("userId", "username");

    if (!sharedContent) {
      return res.status(404).json({
        status: "error",
        message: "Shared content not found",
      });
    }

    sharedContent.shareCount += 1;
    await sharedContent.save();

    res.status(200).json({
      status: "success",
      data: sharedContent,
    });
  } catch (error) {
    console.error("Get shared content error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserSharedContent = async (req, res) => {
  try {
    const sharedContents = await SharedContent.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: sharedContents,
    });
  } catch (error) {
    console.error("Get user shared content error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteSharedContent = async (req, res) => {
  try {
    const { slug } = req.params;

    const sharedContent = await SharedContent.findOne({
      uniqueSlug: slug,
      userId: req.user._id,
    });

    if (!sharedContent) {
      return res.status(404).json({
        status: "error",
        message: "Shared content not found or unauthorized",
      });
    }

    await sharedContent.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Shared content deleted successfully",
    });
  } catch (error) {
    console.error("Delete shared content error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};