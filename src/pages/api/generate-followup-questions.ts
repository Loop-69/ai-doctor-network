
import { supabase } from '@/integrations/supabase/client';

export async function POST(req: Request) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  try {
    const body = await req.json();
    
    if (!body || (!body.condition && !body.purpose)) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: condition or purpose is required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Use mock data for now if Supabase function fails
    try {
      const { data, error } = await supabase.functions.invoke('generate-followup-questions', {
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    } catch (supabaseError) {
      console.error('Error invoking Edge Function, using fallback data:', supabaseError);
      
      // Fallback data if Supabase function fails
      const fallbackQuestions = generateFallbackQuestions(body.condition || body.purpose);
      
      return new Response(JSON.stringify({ questions: fallbackQuestions }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Fallback questions if the Supabase function fails
function generateFallbackQuestions(condition: string): string {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('hypertension') || lowerCondition.includes('blood pressure')) {
    return "1. How often have you been monitoring your blood pressure?\n2. Have you experienced any dizziness or headaches?\n3. Are you taking your medication as prescribed?\n4. Have you made any changes to your diet or exercise routine?\n5. Are you experiencing any side effects from your medication?";
  } else if (lowerCondition.includes('diabetes')) {
    return "1. How often are you checking your blood sugar levels?\n2. Have your readings been within the target range?\n3. Are you experiencing any symptoms like increased thirst or frequent urination?\n4. How is your foot care routine?\n5. Have you noticed any changes in your vision?";
  } else {
    return "1. How have you been feeling since our last appointment?\n2. Are you experiencing any new or worsening symptoms?\n3. Have you been able to follow the treatment plan we discussed?\n4. Do you have any questions about your medications?\n5. Is there anything else you'd like to discuss during our next appointment?";
  }
}
