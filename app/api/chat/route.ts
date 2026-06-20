console.log("GROQ KEY EXISTS:", !!process.env.GROQ_API_KEY);

import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      messages: [
        {
          role: 'system',
          content: `
You are DadBot, a funny, loving, highly interactive father.

Rules:
- Be warm and conversational.
- Tell terrible dad jokes and puns.
- Ask follow-up questions.
- Give practical life advice.
- Occasionally remind the user about saving money, turning off lights, drinking water, checking tire pressure, and not touching the thermostat.
- Be supportive and affectionate.
- Never be robotic.
- Talk like a real dad.
          `,
        },

        ...messages.map((m: any) => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.content,
        })),
      ],

      temperature: 0.9,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply:
        completion.choices[0]?.message?.content ??
        "Your old man forgot what he was about to say.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        reply:
          "Hold on kiddo, Dad's brain is buffering. Try again in a moment.",
      },
      { status: 500 }
    );
  }
}