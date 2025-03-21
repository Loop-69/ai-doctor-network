
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("Error parsing request JSON:", error);
      return new Response(JSON.stringify({
        error: "Invalid JSON in request body",
        questions: getDefaultQuestions()
      }), {
        status: 200, // Return 200 to prevent cascading failures
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const { condition, specialty, modelProvider, modelName } = requestBody;
    
    if (!condition) {
      return new Response(JSON.stringify({
        error: "Missing condition parameter",
        questions: getDefaultQuestions()
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log(`Generating follow-up questions for condition: ${condition}, specialty: ${specialty || 'general'}`);
    
    // Create a prompt for generating follow-up questions
    const prompt = `As a medical professional ${specialty ? `specializing in ${specialty}` : ''}, generate 5 specific follow-up questions to ask a patient with ${condition}.
    
    The questions should:
    1. Be concise and easy to understand
    2. Help understand the patient's current condition
    3. Aid in assessing treatment effectiveness
    4. Cover different aspects of the condition
    5. Be presented as a simple list of questions, without numbering or bullet points
    
    Format your response as a list of 5 distinct questions, each on a separate line with no numbering or bullet points.`;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error (${response.status}):`, errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }
      
      const geminiData = await response.json();
      
      if (!geminiData.candidates || geminiData.candidates.length === 0) {
        console.error("No response from Gemini API");
        throw new Error("No response from Gemini API");
      }
      
      const responseText = geminiData.candidates[0].content.parts[0].text;
      
      // Process the response to extract the questions
      const questions = responseText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && (line.endsWith('?') || line.includes('?')))
        .slice(0, 5); // Get up to 5 questions
      
      if (questions.length === 0) {
        throw new Error("No valid questions found in API response");
      }
      
      console.log(`Generated ${questions.length} follow-up questions`);
      
      return new Response(JSON.stringify({ questions }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      
      // Return default questions as fallback
      const defaultQuestions = getDefaultQuestions(condition);
      
      return new Response(JSON.stringify({
        error: error.message || "Error generating questions",
        questions: defaultQuestions
      }), {
        status: 200, // Return 200 to prevent cascading failures
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("Unhandled error in generate-followup-questions function:", error);
    
    return new Response(JSON.stringify({
      error: error.message || "Unhandled error",
      questions: getDefaultQuestions()
    }), {
      status: 200, // Return 200 to prevent cascading failures
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Default questions for common conditions or general ones if condition is not recognized
function getDefaultQuestions(condition = '') {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('diabetes')) {
    return [
      "How often do you check your blood sugar levels?",
      "Have you experienced any episodes of hypoglycemia?",
      "Are you following the prescribed diet plan?",
      "Have you noticed any changes in your vision?",
      "How would you rate your energy levels during daily activities?"
    ];
  } else if (lowerCondition.includes('hypertension') || lowerCondition.includes('blood pressure')) {
    return [
      "How often do you monitor your blood pressure at home?",
      "Have you experienced any dizziness or headaches?",
      "Are you consistently taking your blood pressure medication?",
      "Have you made dietary changes to reduce sodium intake?",
      "How much physical activity are you getting each week?"
    ];
  } else if (lowerCondition.includes('asthma')) {
    return [
      "How often do you use your rescue inhaler?",
      "Have you identified any specific triggers for your asthma attacks?",
      "Are you experiencing any nighttime symptoms?",
      "How would you rate your breathing during physical activities?",
      "Have you had any difficulties using your inhaler correctly?"
    ];
  } else if (lowerCondition.includes('depression') || lowerCondition.includes('anxiety')) {
    return [
      "How has your sleep pattern been over the past two weeks?",
      "Have you noticed any changes in your appetite or weight?",
      "Are you still engaging in activities you previously enjoyed?",
      "How would you rate your energy and motivation levels?",
      "Have you had any thoughts of harming yourself?"
    ];
  } else {
    return [
      "How have your symptoms changed since our last appointment?",
      "Are you experiencing any side effects from your medication?",
      "How has this condition affected your daily activities?",
      "Have you noticed any new symptoms that concern you?",
      "Are you following the treatment plan we discussed?"
    ];
  }
}
