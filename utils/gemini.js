const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_SECRET_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw error;
  }
};
