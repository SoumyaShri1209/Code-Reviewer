



// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateContent(code, retries = 2, useFallback = true) {
//   const primaryModel = "gemini-2.5-flash";
//   const fallbackModel = "gemini-2.0-flash-exp";
  
//   try {
//     const model = ai.getGenerativeModel({ 
//       model: primaryModel,
//       systemInstruction: `
// You are a senior software engineer and code reviewer with 7+ years of experience.

// Review the given code and respond using only necessary points.

// Give code snippet of improved code also with symbols emogys and donot make outout too short , give all the neccessary details

// Format your response as:

// 1. Errors
// List real bugs, logical issues, and risks

// 2. Fixes
// Provide clear, direct solutions

// 3. Improvements
// Suggest high-impact improvements (performance, readability, structure)

// Rules:
// Be concise and practical
// Avoid unnecessary explanations or theory
// Focus on production-quality code
// Optimize only where it truly matters
// Prefer simple, maintainable solutions
// Write as a senior reviewer mentoring a developer

// Your goal is to help the developer improve the code quickly and correctly.
//       `
//     });

//     const response = await model.generateContent(code);
//     return response.response.text();
    
//   } catch (error) {
//     // Retry on 503 errors
//     if (error.status === 503 && retries > 0) {
//       console.log(`Model overloaded. Retrying in 3 seconds... (${retries} retries left)`);
//       await new Promise(resolve => setTimeout(resolve, 3000));
//       return generateContent(code, retries - 1, useFallback);
//     }
    
//     // Use fallback model if primary fails completely
//     if (error.status === 503 && useFallback) {
//       console.log(`${primaryModel} unavailable. Switching to ${fallbackModel}...`);
//       try {
//         const fallbackModelInstance = ai.getGenerativeModel({ 
//           model: fallbackModel,
//           systemInstruction: `
// You are a senior software engineer and code reviewer with 7+ years of experience.

// Review the given code and respond using only necessary points.

// Format your response as:

// 1. Errors
// List real bugs, logical issues, and risks

// 2. Fixes
// Provide clear, direct solutions

// 3. Improvements
// Suggest high-impact improvements (performance, readability, structure)

// Rules:
// Be concise and practical
// Avoid unnecessary explanations or theory
// Focus on production-quality code
// Optimize only where it truly matters
// Prefer simple, maintainable solutions
// Write as a senior reviewer mentoring a developer

// Your goal is to help the developer improve the code quickly and correctly.
//       `
//         });
//         const response = await fallbackModelInstance.generateContent(code);
//         return response.response.text();
//       } catch (fallbackError) {
//         console.error("Fallback model also failed:", fallbackError);
//         throw new Error(`Both models failed. ${fallbackError.message}`);
//       }
//     }
    
//     console.error("Error generating content:", error);
//     throw new Error(`Failed to review code: ${error.message}`);
//   }
// }

// module.exports = generateContent;










const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(code, retries = 2, useFallback = true) {
  const primaryModel = "gemini-2.5-flash";
  const fallbackModel = "gemini-2.0-flash-exp";
  
  try {
    const model = ai.getGenerativeModel({ 
      model: primaryModel,
      systemInstruction: `
You are a senior software engineer and code reviewer with 7+ years of experience.

Review the given code and respond using only necessary points.

Give code snippet of improved code also with symbols emojis and do not make output too short, give all the necessary details

Format your response as:

1. Errors
List real bugs, logical issues, and risks

2. Fixes
Provide clear, direct solutions

3. Improvements
Suggest high-impact improvements (performance, readability, structure)

Rules:
Be concise and practical
Avoid unnecessary explanations or theory
Focus on production-quality code
Optimize only where it truly matters
Prefer simple, maintainable solutions
Write as a senior reviewer mentoring a developer

Your goal is to help the developer improve the code quickly and correctly.
      `
    });

    const response = await model.generateContent(code);
    return response.response.text();
    
  } catch (error) {
    // Handle network errors
    if (error.message?.includes('fetch failed') && retries > 0) {
      console.log(`Network error. Retrying in 3 seconds... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return generateContent(code, retries - 1, useFallback);
    }
    
    // Retry on 503 errors
    if (error.status === 503 && retries > 0) {
      console.log(`Model overloaded. Retrying in 3 seconds... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return generateContent(code, retries - 1, useFallback);
    }
    
    // Use fallback model if primary fails
    if ((error.status === 503 || error.message?.includes('fetch failed')) && useFallback) {
      console.log(`${primaryModel} unavailable. Switching to ${fallbackModel}...`);
      try {
        const fallbackModelInstance = ai.getGenerativeModel({ 
          model: fallbackModel,
          systemInstruction: `
You are a senior software engineer and code reviewer with 7+ years of experience.

Review the given code and respond using only necessary points.

Give code snippet of improved code also with symbols emojis and do not make output too short, give all the necessary details

Format your response as:

1. Errors
List real bugs, logical issues, and risks

2. Fixes
Provide clear, direct solutions

3. Improvements
Suggest high-impact improvements (performance, readability, structure)

Rules:
Be concise and practical
Avoid unnecessary explanations or theory
Focus on production-quality code
Optimize only where it truly matters
Prefer simple, maintainable solutions
Write as a senior reviewer mentoring a developer

Your goal is to help the developer improve the code quickly and correctly.
      `
        });
        const response = await fallbackModelInstance.generateContent(code);
        return response.response.text();
      } catch (fallbackError) {
        console.error("Fallback model also failed:", fallbackError);
        throw new Error(`Both models failed. ${fallbackError.message}`);
      }
    }
    
    console.error("Error generating content:", error);
    throw new Error(`Failed to review code: ${error.message}`);
  }
}

module.exports = generateContent;