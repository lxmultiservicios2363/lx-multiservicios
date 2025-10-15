// src/app/api/whatsapp/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findResponse } from '@/lib/chatbot-responses';

// Webhook para recibir mensajes de WhatsApp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log para ver qué recibe el webhook
    console.log('Webhook recibido:', JSON.stringify(body, null, 2));

    // TODO: Aquí procesaremos los mensajes reales de WhatsApp
    // Por ahora simulamos una respuesta
    
    const userMessage = body.message || 'hola';
    const chatbotResponse = findResponse(userMessage);

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido',
      response: chatbotResponse
    });

  } catch (error) {
    console.error('Error en webhook WhatsApp:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// WhatsApp requiere verificar el webhook con GET
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parámetros que envía WhatsApp para verificación
  const hubMode = searchParams.get('hub.mode');
  const hubToken = searchParams.get('hub.verify_token');
  const hubChallenge = searchParams.get('hub.challenge');

  // Verificar el token (debes configurar esto después)
  const VERIFY_TOKEN = 'tu_token_secreto'; // Cambiar luego

  if (hubMode === 'subscribe' && hubToken === VERIFY_TOKEN) {
    return new Response(hubChallenge, { status: 200 });
  }

  return NextResponse.json(
    { error: 'Token de verificación inválido' },
    { status: 403 }
  );
}