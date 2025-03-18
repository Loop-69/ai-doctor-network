
// Creating a standard API endpoint compatible with both Next.js App Router and other frameworks

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API route: Calling generate-medical-response with:", JSON.stringify(body).substring(0, 200));
    
    // Import supabase from the correct path
    const { supabase } = await import('@/integrations/supabase/client');

    const { data, error } = await supabase.functions.invoke('generate-medical-response', {
      body: body
    });

    if (error) {
      console.error('Error invoking Edge Function:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// This is needed for some frameworks, but not all
export const config = {
  runtime: 'edge',
};
