export const dreamChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        status: "error",
        message: "Messages array required",
      });
    }
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const fakeReply = `🧠 Dream Insight (Test Mode):
      You mentioned: "${lastUserMessage}"
       This dream may symbolise hidden thoughts or emotions you are currently processing.
       (Test response – OpenAI not connected yet)`;
    await new Promise((r) => setTimeout(r, 1200));
    res.status(200).json({
      status: "success",
      reply: fakeReply,
    });
  } catch (error) {
    console.error("Mock AI error:", error);
    res.status(500).json({
      status: "error",
      message: "Mock AI failed",
    });
  }
};
