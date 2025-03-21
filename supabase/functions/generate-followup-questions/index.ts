
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Hardcoded API key since we can't use the environment variable
const GEMINI_API_KEY = 'AIzaSyBBXVIaqFnVmbT7cjp_f1Ow0sWcHGt9teI';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    console.log("Received request to generate follow-up questions");
    
    // Parse the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("Error parsing request JSON:", parseError);
      return new Response(JSON.stringify({ 
        error: "Invalid JSON in request body",
        fallbackQuestions: getFallbackQuestions("general")
      }), {
        status: 200, // Return 200 even for parse errors to prevent cascading failures
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const { condition, specialty, modelProvider, modelName } = requestBody;

    if (!condition) {
      console.error("Missing required field: condition");
      return new Response(JSON.stringify({ 
        error: "Medical condition is required",
        questions: getFallbackQuestions("general")
      }), {
        status: 200, // Return 200 with fallback questions
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Generating follow-up questions for condition: ${condition}`);
    console.log(`Using model: ${modelProvider || 'gemini'}/${modelName || 'gemini-2.0-flash'}`);
    
    if (specialty) {
      console.log(`With specialty context: ${specialty}`);
    }
    
    // Build the prompt for the Gemini API
    const prompt = `
    You are an AI medical assistant helping to generate appropriate follow-up questions for a patient with the following condition: ${condition}.
    ${specialty ? `The doctor specializes in ${specialty}.` : ''}
    
    Generate 3-5 specific follow-up questions that would be valuable to ask this patient during a scheduled follow-up call.
    The questions should:
    1. Check on their current symptoms and any changes
    2. Assess their adherence to treatment plans
    3. Identify any new issues or side effects
    4. Evaluate their overall progress
    
    Format your response as a JSON array of strings, with each string being a question.
    Example format: ["Question 1?", "Question 2?", "Question 3?"]
    `;

    try {
      console.log("Calling Gemini API with prompt");
      // Call Gemini API with the format specified in the curl example
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          }),
        }
      );
      
      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.text();
        console.error("Error response from Gemini API:", errorData);
        throw new Error(`Gemini API error (${geminiResponse.status}): ${errorData}`);
      }

      const geminiData = await geminiResponse.json();
      console.log("Gemini API response received");

      if (!geminiData.candidates || geminiData.candidates.length === 0) {
        console.error("No response from Gemini API:", geminiData);
        throw new Error("No response from Gemini API");
      }

      const responseText = geminiData.candidates[0].content.parts[0].text;
      
      // Parse the response to extract the questions
      let questions = [];
      try {
        // Try to parse direct JSON array
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback to extracting questions line by line
          const lines = responseText.split('\n').filter(line => 
            line.trim().match(/^[0-9]+[\.\)]\s.*\?$/) || 
            line.trim().match(/^".*\?"$/) ||
            line.trim().match(/^-\s.*\?$/)
          );
          
          questions = lines.map(line => {
            return line.replace(/^[0-9]+[\.\)]\s/, '')
                       .replace(/^-\s/, '')
                       .replace(/^"/, '')
                       .replace(/"$/, '')
                       .trim();
          });
        }
      } catch (parseError) {
        console.error("Error parsing questions:", parseError);
        // If parsing fails, extract text that looks like questions
        const questionMatches = responseText.match(/(?:"[^"]+\?")|(?:[^\n]+\?)/g);
        if (questionMatches) {
          questions = questionMatches.map(q => q.replace(/^"/, '').replace(/"$/, '').trim());
        }
      }
      
      // Ensure we have at least some questions
      if (questions.length === 0) {
        questions = getFallbackQuestions(condition);
      }
      
      console.log("Generated questions:", questions);
      
      return new Response(JSON.stringify({ questions }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (geminiError) {
      console.error("Error calling Gemini API:", geminiError);
      // Return fallback questions for the condition
      return new Response(JSON.stringify({ 
        error: geminiError.message,
        questions: getFallbackQuestions(condition)
      }), {
        status: 200, // Return 200 even for API errors
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("Unhandled error in generate-followup-questions function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      questions: [
        "How have your symptoms changed since your last visit?",
        "Have you been following the prescribed treatment plan?",
        "Have you experienced any new symptoms or side effects?"
      ] 
    }), {
      status: 200, // Return 200 even for unhandled errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to generate fallback questions based on condition
function getFallbackQuestions(condition: string): string[] {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('hypertension') || lowerCondition.includes('blood pressure')) {
    return [
      "How often have you been monitoring your blood pressure?",
      "Have you experienced any dizziness or headaches?",
      "Are you taking your medication as prescribed?",
      "Have you made any changes to your diet or exercise routine?",
      "Are you experiencing any side effects from your medication?"
    ];
  } else if (lowerCondition.includes('diabetes')) {
    return [
      "How often are you checking your blood sugar levels?",
      "Have your readings been within the target range?",
      "Are you experiencing any symptoms like increased thirst or frequent urination?",
      "How is your foot care routine?",
      "Have you noticed any changes in your vision?"
    ];
  } else {
    return [
      "How have you been feeling since our last appointment?",
      "Are you experiencing any new or worsening symptoms?",
      "Have you been able to follow the treatment plan we discussed?",
      "Do you have any questions about your medications?",
      "Is there anything else you'd like to discuss during our next appointment?"
    ];
  }
}
