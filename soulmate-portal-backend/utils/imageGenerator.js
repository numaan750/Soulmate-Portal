import cloudinary from "./cloudinary.js";
import fetch from "node-fetch";

export const generateSoulmateImage = async ({
  gender,
  ethnicBackground,
  vibe,
}) => {
  try {
    const genderText =
      gender === "male"
        ? "young man portrait"
        : gender === "female"
          ? "young woman portrait"
          : "young person portrait";

    const ethnicText = ethnicBackground.replace(/-/g, " ");

    const prompt = `ultra sharp high quality and white line art pancil Sketch, fine line pencil sketch, pure ink outline drawing, only clean thin contour lines, no shading, no grayscale, no color, no fill, white background, vector style, high contrast black lines, extremely crisp details,
         ${genderText},
         ${ethnicText} features,
         ${vibe} expression
        `;

    const negativePrompt = `color, grayscale, shading, shadow, gradient, realistic photo, photography, 3d render, blur, soft focus, watercolor, oil painting, anime, cartoon, thick strokes, messy lines`;

    const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt,
    )}?width=768&height=768&nologo=true&negative=${encodeURIComponent(
      negativePrompt,
    )}&seed=${Math.floor(Math.random() * 1000000)}`;

    const response = await fetch(aiImageUrl);

    if (!response.ok) {
      throw new Error(`Image fetch failed with status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "soulmates",
        transformation: [{ effect: "sharpen:100" }, { effect: "contrast:20" }],
      },
    );

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw new Error("Image generation failed");
  }
};
