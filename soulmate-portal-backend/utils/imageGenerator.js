import cloudinary from "./cloudinary.js";
import fetch from "node-fetch";

export const generateSoulmateImage = async ({
  gender,
  birthDate,
  ethnicBackground,
  vibe,
  birthplace,
  birthTime,
}) => {
  try {
    const ethnicText = ethnicBackground.replace(/-/g, " ");

    const prompt = `A solo black and white pencil sketch on paper of my soulmate, My soulmate gender will be${gender},
born on ${birthDate}, with an ${ethnicText} background with embodies a ${vibe} aura.
The portrait should capture natural beauty, soft expression, and emotional depth, connected to my birth in ${birthplace} at ${birthTime}.
Use fine pencil strokes, shading, and a hand-drawn style to create a timeless and elegant soulmate portrait.`;

    const response = await fetch(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.DASHSCOPE_API_KEY,
        },
        body: JSON.stringify({
          model: "wan2.6-t2i",
          input: {
            messages: [
              {
                role: "user",
                content: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          parameters: {
            negative_prompt: "",
            prompt_extend: true,
            watermark: false,
            n: 1,
            size: "1328*1328",
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error("Dashscope image generation failed");
    }

    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;

    if (!imageUrl) {
      throw new Error("No image returned from Dashscope");
    }

    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "soulmates",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw new Error("Image generation failed");
  }
};
