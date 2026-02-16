import { openai, getSystemPrompt, OPENAI_CONFIG } from "../config/ai.config.js";
export const dreamChat = async (req, res) => {
  try {
    const { messages, type = "any_dream" } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        status: "error",
        message: "Messages array is required",
      });
    }

    if (messages.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Messages cannot be empty",
      });
    }
    const systemPrompt = getSystemPrompt(type);

    console.log(
      `🤖 [${type.toUpperCase()}] Processing ${messages.length} message(s)`,
    );
    const openaiMessages = [
      systemPrompt,
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: openaiMessages,
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: OPENAI_CONFIG.max_tokens,
      top_p: OPENAI_CONFIG.top_p,
      frequency_penalty: OPENAI_CONFIG.frequency_penalty,
      presence_penalty: OPENAI_CONFIG.presence_penalty,
    });
    const aiReply = completion.choices[0]?.message?.content;

    if (!aiReply) {
      throw new Error("No response from OpenAI");
    }
    console.log(`✅ [${type.toUpperCase()}] Response generated`);
    console.log(`📊 Tokens: ${completion.usage?.total_tokens || 0}`);
    return res.status(200).json({
      status: "success",
      reply: aiReply,
      metadata: {
        type: type,
        model: completion.model,
        tokensUsed: completion.usage?.total_tokens || 0,
      },
    });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);

    if (error.status) {
      const errorMap = {
        400: "Invalid request format",
        401: "Invalid API key - Please check configuration",
        429: "Rate limit exceeded - Please try again later",
        500: "OpenAI server error - Please try again",
        503: "OpenAI service unavailable - Please try again",
      };

      return res.status(error.status).json({
        status: "error",
        message: errorMap[error.status] || "OpenAI API error",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to process message. Please try again.",
    });
  }
};
