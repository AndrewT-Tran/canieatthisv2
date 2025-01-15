export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const APP_ID = process.env.NEXT_PUBLIC_NUT_ANALYSIS_APP_ID;
    const APP_KEY = process.env.NEXT_PUBLIC_NUT_ANALYSIS_API_KEY;
    const EDAMAM_API_URL = 'https://api.edamam.com/api/nutrition-data';

    const url = new URL(EDAMAM_API_URL);
    url.searchParams.append('app_id', APP_ID);
    url.searchParams.append('app_key', APP_KEY);
    url.searchParams.append('ingr', query);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch nutrition data');
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Nutrition API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
