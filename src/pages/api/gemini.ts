import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Obtener la API Key desde Cloudflare o variables de entorno locales
    
    // En Cloudflare Pages, las variables de entorno están en locals.runtime.env
    // En desarrollo local, están en import.meta.env
    const apiKey = locals.runtime?.env?.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Falta la API Key en el servidor" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Leer el body que envía tu Contact.astro
    const body = await request.json();
    const { userPrompt } = body; // Tu frontend envía "userPrompt", así que leemos eso.

    if (!userPrompt) {
      return new Response(
        JSON.stringify({
          error: "Por favor escribe una idea para el mensaje.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. Configurar Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    // Usamos 'gemini-1.5-flash' que es rápido, barato y estable.
    // Si tienes acceso a 'gemini-2.0-flash-lite', puedes cambiar el nombre aquí.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
        Eres un asistente de redacción experto para el portafolio web de Miguel Delgado.
        TU TAREA: Redactar un mensaje de contacto profesional en PRIMERA PERSONA (como si fueras el usuario escribiéndole a Miguel).
        REGLAS: NO generes código. Sé breve, directo y profesional. Tono: Formal pero cercano.
      `,
    });

    // 4. Generar el contenido
    // Solo enviamos el prompt del usuario, el systemInstruction ya está configurado arriba
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    // 5. Devolver la respuesta en el formato que tu frontend espera ({ text: ... })
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return new Response(
      JSON.stringify({ error: "Error procesando la solicitud con IA" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
