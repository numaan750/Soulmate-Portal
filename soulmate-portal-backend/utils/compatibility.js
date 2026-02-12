export const calculateCompatibility = (birthDate, birthTime) => {
  const baseScore = 85;
  const randomBonus = Math.floor(Math.random() * 15);
  return baseScore + randomBonus;
};

export const generateInsights = (score, vibe) => {
  const insights = {
    strengths: "",
    weaknesses: "",
    compatibility: "",
    glimpse: "",
  };

  if (score >= 95) {
    insights.strengths =
      "You and your soulmate share exceptional emotional support, with deep respect forming the foundation of your bond. Together, you can overcome any challenge and grow stronger through life's journey.";
    insights.weaknesses =
      "Occasional perfectionism may create minor tension. Remember to embrace imperfections together and allow space for individual growth.";
    insights.compatibility =
      "You share an extraordinary emotional understanding. Your differences perfectly complement each other, creating remarkable balance and endless opportunities for long-term growth.";
    insights.glimpse = `Your perfect soulmate embodies ${vibe} energy, balancing your soul with profound emotional depth and creating an unmatched harmony that transcends ordinary connections.`;
  } else if (score >= 90) {
    insights.strengths =
      "You and your soulmate share strong emotional support, with mutual respect and understanding as your foundation. Together, you create a nurturing environment for growth.";
    insights.weaknesses =
      "At times, mood swings or misunderstandings may create temporary distance. Open communication and patience will help you maintain balance and individuality.";
    insights.compatibility =
      "You share a natural emotional understanding that creates harmony. Your differences create perfect balance, offering opportunities for continuous growth and deeper connection.";
    insights.glimpse = `Your perfect soulmate's ${vibe} nature balances your practicality with deep emotions, creating lasting harmony and a bond filled with compassion and understanding.`;
  } else {
    insights.strengths =
      "You and your soulmate share emotional support and growing respect. Your connection offers a solid foundation for building something meaningful together.";
    insights.weaknesses =
      "Communication gaps may occasionally arise. Both partners must work to maintain individuality while nurturing the relationship's growth.";
    insights.compatibility =
      "You share good emotional understanding with room for deeper connection. Your journey together will be one of discovery and mutual development.";
    insights.glimpse = `Your soulmate's ${vibe} personality complements your energy, offering opportunities for mutual growth and creating a bond that strengthens over time.`;
  }

  return insights;
};
