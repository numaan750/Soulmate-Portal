import {
  openai,
  createSoulmateSystemPrompt,
  OPENAI_CONFIG,
} from "../config/ai.config.js";

export const chatWithSoulmate = async (req, res) => {
  try {
    const { messages, soulmateData } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        status: "error",
        message: "Messages array is required",
      });
    }

    if (!soulmateData) {
      return res.status(400).json({
        status: "error",
        message: "Soulmate data is required",
      });
    }
    const systemPrompt = createSoulmateSystemPrompt(soulmateData);

    console.log(
      `💕 [SOULMATE CHAT] ${soulmateData.gender} soulmate with ${soulmateData.vibe} vibe`,
    );
    const openaiMessages = [
      systemPrompt,
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: openaiMessages,
      temperature: 0.8,
      max_tokens: 400,
      top_p: 0.95,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || "";
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error) {
    console.error("❌ Soulmate Chat Error:", error);

    if (error.status) {
      const errorMap = {
        400: "Invalid request",
        401: "Invalid API key",
        429: "Rate limit exceeded",
        500: "AI service error",
      };

      return res.status(error.status).json({
        status: "error",
        message: errorMap[error.status] || "Chat failed",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to connect with your soulmate",
    });
  }
};
