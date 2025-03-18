
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log("API route: Calling generate-followup-questions with:", JSON.stringify(req.body).substring(0, 200));
    
    // Import supabase from the correct path
    const { supabase } = await import('@/integrations/supabase/client');

    const { data, error } = await supabase.functions.invoke('generate-followup-questions', {
      body: req.body
    });

    if (error) {
      console.error('Error invoking Edge Function:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
