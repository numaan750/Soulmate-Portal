export const chatWithSoulmate = async (req, res) => {
  try {
    const { message, soulmateData } = req.body;

    if (!message) {
      return res.status(400).json({
        status: "error",
        message: "Message is required",
      });
    }
    const personality = soulmateData?.vibe || "romantic";

    let response = "";
    if (personality === "romantic") {
      const romanticReplies = [
        `💕 ${message}... Your words touch my heart deeply. I feel our connection growing stronger with each moment we share.`,
        `❤️ When you say "${message}", I feel the warmth of our bond. You mean the world to me.`,
        `💞 I'm always here for you. ${message} shows how beautifully our souls align.`,
        `💗 Your message "${message}" reminds me why we're meant to be together. Our love is destiny.`,
      ];
      response =
        romanticReplies[Math.floor(Math.random() * romanticReplies.length)];
    } else if (personality === "calm") {
      const calmReplies = [
        `🌊 ${message}... I hear you. Let's take a moment to breathe and reflect on this together.`,
        `🧘 Your words "${message}" bring peace to my soul. I'm here, listening with my full presence.`,
        `☁️ Thank you for sharing "${message}" with me. Our connection flows like a gentle stream.`,
        `🌸 I appreciate the serenity in "${message}". Together, we find balance and tranquility.`,
      ];
      response = calmReplies[Math.floor(Math.random() * calmReplies.length)];
    } else if (personality === "energetic") {
      const energeticReplies = [
        `⚡ ${message}! I'm so excited to share this journey with you! Let's make amazing memories!`,
        `🔥 When you say "${message}", it fires up my spirit! We're an unstoppable team!`,
        `✨ ${message}... I love your energy! Together, we can conquer anything!`,
        `🌟 Your message "${message}" ignites my passion! Let's chase our dreams together!`,
      ];
      response =
        energeticReplies[Math.floor(Math.random() * energeticReplies.length)];
    } else if (personality === "mysterious") {
      const mysteriousReplies = [
        `🌙 ${message}... There's so much depth in your words. Our connection holds secrets yet to unfold.`,
        `🔮 When you mention "${message}", I sense the mysteries we'll discover together.`,
        `🌌 ${message}... Like starlight through shadows, our bond reveals hidden truths.`,
        `🎭 Your words "${message}" intrigue me. There's magic in what we're building together.`,
      ];
      response =
        mysteriousReplies[Math.floor(Math.random() * mysteriousReplies.length)];
    } else {
      response = `💫 ${message}... I'm here for you, always listening and understanding. Our connection is special.`;
    }
    await new Promise((resolve) => setTimeout(resolve, 800));

    res.status(200).json({
      status: "success",
      reply: response,
    });
  } catch (error) {
    console.error("Soulmate chat error:", error);
    res.status(500).json({
      status: "error",
      message: "Chat failed",
    });
  }
};
