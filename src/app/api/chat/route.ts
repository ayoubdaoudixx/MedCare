import Groq from "groq-sdk";
import { services } from "@/lib/services-data";
import { buildSystemPrompt } from "@/lib/chatbot-system-prompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory rate limiting: max 20 messages per sessionId per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const MAX_MESSAGES_PER_HOUR = 20;
const MAX_MESSAGE_LENGTH = 500;

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(sessionId, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= MAX_MESSAGES_PER_HOUR) return false;

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, sessionId } = body as {
      messages: { role: string; content: string }[];
      sessionId: string;
    };

    if (!sessionId || typeof sessionId !== "string") {
      return Response.json({ error: "sessionId requis." }, { status: 400 });
    }

    if (!checkRateLimit(sessionId)) {
      return Response.json(
        { error: "Limite de messages atteinte. Veuillez réessayer dans une heure." },
        { status: 429 }
      );
    }

    // Validate and sanitize messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages invalides." }, { status: 400 });
    }

    const sanitizedMessages = messages
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, MAX_MESSAGE_LENGTH),
      }));

    const systemPrompt = buildSystemPrompt(services);

    const groqStream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...sanitizedMessages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.6,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of groqStream) {
            const token = chunk.choices[0]?.delta?.content;
            if (token) {
              controller.enqueue(encoder.encode(token));
            }
          }
        } catch {
          controller.error("Stream error");
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return Response.json(
      { error: "Une erreur s'est produite." },
      { status: 500 }
    );
  }
}
