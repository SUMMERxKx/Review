const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeReview = async (reviewData) => {
  try {
    // Access the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format the review data for analysis
    const reviewText = formatReviewForAnalysis(reviewData);

    // Prompt for Gemini
    const prompt = `
      Analyze the following customer feedback and provide:
      1. Overall sentiment score (between -1 and 1, where -1 is very negative and 1 is very positive)
      2. Key topics or themes mentioned (maximum 5)
      3. A brief summary of the feedback (maximum 2 sentences)
      4. Actionable suggestions for the business (maximum 3)

      Customer Feedback:
      ${reviewText}

      Format your response as JSON:
      {
        "sentimentScore": number,
        "keyTopics": [string],
        "summary": string,
        "suggestions": string
      }
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = response.text();

    // Extract the JSON response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    // Parse the JSON
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing review with Gemini API:", error);
    return {
      sentimentScore: 0,
      keyTopics: ["analysis failed"],
      summary: "Unable to analyze review content.",
      suggestions: "Review manually."
    };
  }
};

// Helper function to format review data for analysis
function formatReviewForAnalysis(reviewData) {
  let formattedText = `Customer Name: ${reviewData.customerName || "Anonymous"}\n`;
  
  if (reviewData.overallRating) {
    formattedText += `Overall Rating: ${reviewData.overallRating}/5\n\n`;
  }
  
  formattedText += "Answers:\n";
  
  if (reviewData.answers && reviewData.answers.length > 0) {
    reviewData.answers.forEach(answer => {
      formattedText += `Q: ${answer.questionText}\n`;
      if (answer.answerRating) {
        formattedText += `A: ${answer.answerRating}/5\n`;
      }
      if (answer.answerText) {
        formattedText += `A: ${answer.answerText}\n`;
      }
      formattedText += "\n";
    });
  }
  
  return formattedText;
}

module.exports = { analyzeReview };