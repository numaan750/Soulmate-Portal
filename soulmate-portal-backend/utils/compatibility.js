import { openai } from "../config/ai.config.js";

export const calculateCompatibility = (birthDate, birthTime) => {
  const baseScore = 85;
  const randomBonus = Math.floor(Math.random() * 15);
  return baseScore + randomBonus;
};

export const generateInsights = async (
  birthDate,
  gender,
  ethnicBackground,
  vibe,
  birthplace,
  birthTime,
) => {
  try {
    const ethnicText = ethnicBackground.replace(/-/g, " ");

    const messages = [
      {
        role: "system",
        content: `You are a ${gender} soulmate.
User details:
- Date of Birth: ${birthDate}
- Ethnic Background: ${ethnicText}
- Imagination Vibe: ${vibe}
- Place of Birth: ${birthplace}
- Time of Birth: ${birthTime}

Your job: Generate a JSON response with exactly these four titles, each with a short, creative subtitle based on the user's details.
Each subtitle MUST be between 30 and 40 words — no more, no less.
Keep the tone ${vibe}.`,
      },
      {
        role: "user",
        content: `Return strictly a JSON object in this format:

{
  "A glimpse into your connection": "subtitle here",
  "Compatibility": "subtitle here",
  "Strengths": "subtitle here",
  "Weaknesses": "subtitle here"
}

Do not change the titles. Just fill in the subtitles based on the soulmate interpretation. 
Follow the 30-40 word limit for each subtitle.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const parsedInsights = JSON.parse(jsonMatch[0]);

    return {
      glimpse: parsedInsights["A glimpse into your connection"],
      compatibility: parsedInsights["Compatibility"],
      strengths: parsedInsights["Strengths"],
      weaknesses: parsedInsights["Weaknesses"],
    };
  } catch (error) {
    console.error("Generate insights error:", error);
    // Fallback to default insights
    return {
      strengths:
        "You and your soulmate share emotional support, with respect forming the foundation of your bond. Together, you can overcome challenges and grow stronger.",
      weaknesses:
        "At times, mood swings or misunderstandings may create distance. To sustain balance, both must maintain individuality.",
      compatibility:
        "You and your soulmate share a natural emotional understanding. Your differences complement each other, creating balance and long-term growth.",
      glimpse: `Your perfect soulmate embodies ${vibe} energy, creating a profound connection that balances your soul with deep emotions and understanding.`,
    };
  }
};
