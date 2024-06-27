import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

export async function POST(request) {
  const { ingredients, email } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates recipes." },
        { role: "user", content: `Generate a recipe using these ingredients: ${ingredients}. User email: ${email}` }
      ],
    });

    return new Response(JSON.stringify({ recipe: completion.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}