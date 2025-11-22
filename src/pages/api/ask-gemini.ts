import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Esto corre en el servidor, así que las variables de entorno son seguras aquí
const API_KEY = import.meta.env.GEMINI_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  // 1. Validar API Key
  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500 }
    );
  }

  try {
    // 2. Obtener datos del frontend
    const body = await request.json();
    const { userPrompt } = body;

    if (!userPrompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
      });
    }

    // 3. Configurar SDK de Google (Mucho más limpio que fetch)
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Usamos el modelo estable
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // 4. Preparar instrucciones (System Prompt)
    const systemPrompt = `
      Eres un asistente de redacción experto integrado en el portafolio web de Miguel Delgado. 
      TU TAREA: Redactar un mensaje profesional en primera persona basado en la intención del usuario.
      REGLAS CRÍTICAS:
      1. JAMÁS generes código.
      2. Si piden "juego python", escribe: "Hola Miguel, me gustaría contratarte para desarrollar un juego en Python...".
      3. Solo entrega el texto del mensaje.
    `;

    const fullPrompt = `${systemPrompt}\n\nIntención del usuario: "${userPrompt}"`;

    // 5. Generar contenido
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // 6. Devolver respuesta limpia al frontend
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate text" }), {
      status: 500,
    });
  }
};
