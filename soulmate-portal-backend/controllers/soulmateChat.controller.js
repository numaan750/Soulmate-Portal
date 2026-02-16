import { openai, createSoulmateSystemPrompt, OPENAI_CONFIG } from '../config/ai.config.js';

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

    console.log(`💕 [SOULMATE CHAT] ${soulmateData.gender} soulmate with ${soulmateData.vibe} vibe`);
    const openaiMessages = [
      systemPrompt,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: openaiMessages,
      temperature: 0.8,
      max_tokens: 400,
      top_p: 0.95,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
    });
    const aiReply = completion.choices[0]?.message?.content;

    if (!aiReply) {
      throw new Error("No response from soulmate");
    }

    console.log(`✅ [SOULMATE CHAT] Response generated`);
    return res.status(200).json({
      status: "success",
      reply: aiReply,
      metadata: {
        type: "soulmate_chat",
        vibe: soulmateData.vibe,
        tokensUsed: completion.usage?.total_tokens || 0,
      }
    });

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