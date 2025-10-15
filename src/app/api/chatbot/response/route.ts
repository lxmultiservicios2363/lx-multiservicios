// src/app/api/chatbot/response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findResponse, getResponse } from '@/lib/chatbot-responses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, responseKey } = body;

    // Validar que tenemos un mensaje o una clave de respuesta
    if (!message && !responseKey) {
      return NextResponse.json(
        { error: 'Se requiere un mensaje o clave de respuesta' },
        { status: 400 }
      );
    }

    let chatbotResponse;
    
    // Si se envía una clave de respuesta específica
    if (responseKey) {
      chatbotResponse = getResponse(responseKey);
    } 
    // Si se envía un mensaje de texto
    else if (message) {
      chatbotResponse = findResponse(message);
    }

    return NextResponse.json({
      success: true,
      response: chatbotResponse
    });

  } catch (error) {
    console.error('Error en API chatbot:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// También permitir GET para pruebas
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('message');
  
  if (!message) {
    return NextResponse.json(
      { error: 'Parámetro "message" requerido' },
      { status: 400 }
    );
  }

  const chatbotResponse = findResponse(message);
  
  return NextResponse.json({
    success: true,
    response: chatbotResponse
  });
}