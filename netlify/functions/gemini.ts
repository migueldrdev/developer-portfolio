import { GoogleGenerativeAI } from '@google/generative-ai';

// En Netlify Functions nativas, se exporta un handler por defecto
export default async (request: Request, context: any) => {
  
  // Solo permitimos POST
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Acceder a la variable de entorno (Netlify las inyecta aquí)
    const API_KEY = process.env.GEMINI_API_KEY || Netlify.env.get("GEMINI_API_KEY");

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Parsear el body
    const body = await request.json();
    const { userPrompt } = body;

    if (!userPrompt) {
      return new Response(JSON.stringify({ error: "Prompt vacío" }), { status: 400 });
    }

    // Lógica de Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const systemPrompt = `
      Eres un asistente de redacción experto para el portafolio web de Miguel Delgado.
      TU TAREA: Redactar un mensaje de contacto profesional en PRIMERA PERSONA.
      REGLAS: NO generes código. Sé breve y profesional.
    `;

    const fullPrompt = `${systemPrompt}\n\nIntención del usuario: "${userPrompt}"`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate text" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};