import { NextRequest, NextResponse } from 'next/server';
import { findResponse } from '@/lib/chatbot-responses';

// VERIFICACIÓN DEL WEBHOOK (GET) - CON TOKEN FIJO
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🎯 === VERIFICACIÓN WEBHOOK ===');
  console.log('🔹 Mode:', mode);
  console.log('🔹 Token recibido:', token);
  console.log('🔹 Challenge:', challenge);
  
  // ✅ VERIFICACIÓN FORZADA - TOKEN FIJO
  const expectedToken = 'lx_multiservicios_2024_token';
  
  if (mode === 'subscribe' && token === expectedToken) {
    console.log('🎉 ✅ WEBHOOK VERIFICADO EXITOSAMENTE!');
    return new NextResponse(challenge, { status: 200 });
  }

  console.log('❌ FALLA EN VERIFICACIÓN');
  console.log('🔹 Razón:', token === expectedToken ? 'Mode incorrecto' : 'Tokens diferentes');
  console.log('🔹 Token recibido:', token);
  console.log('🔹 Token esperado:', expectedToken);
  
  return new NextResponse('Verification failed', { status: 403 });
}

// RECEPCIÓN DE MENSAJES (POST) - INTEGRADO CON TU CHATBOT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📨 === MENSAJE RECIBIDO ===');
    console.log('💬 Contenido:', JSON.stringify(body, null, 2));

    // Verificar que es un mensaje de WhatsApp
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      // Procesar mensajes entrantes
      if (value?.messages) {
        for (const message of value.messages) {
          await processMessage(message);
        }
      }

      console.log('✅ Mensaje procesado exitosamente');
      return NextResponse.json({ success: true });
    }

    console.log('❌ Mensaje no es de WhatsApp Business');
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
    
  } catch (error) {
    console.error('💥 ERROR EN WEBHOOK:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PROCESAR MENSAJES - USA TU BASE DE CONOCIMIENTO EXISTENTE
async function processMessage(message: any) {
  const userPhone = message.from;
  const messageType = message.type;
  const messageText = message.text?.body || '';

  console.log(`📱 Procesando mensaje de ${userPhone}:`);
  console.log(`💬 Tipo: ${messageType}, Texto: "${messageText}"`);

  switch (messageType) {
    case 'text':
      await handleTextMessage(userPhone, messageText);
      break;
    case 'interactive':
      await handleInteractiveMessage(userPhone, message);
      break;
    default:
      // Usar respuesta por defecto de TU chatbot
      console.log('🔍 Usando respuesta por defecto del chatbot');
      const defaultResponse = findResponse('');
      await sendMessage(userPhone, defaultResponse.message);
  }
}

// MANEJAR MENSAJES DE TEXTO - INTEGRADO CON TU CHATBOT
async function handleTextMessage(phone: string, text: string) {
  console.log(`🔍 Buscando respuesta para: "${text}"`);
  
  // ✅ USA TU CHATBOT EXISTENTE - misma lógica que tu API
  const chatbotResponse = findResponse(text);
  
  console.log(`🤖 Respuesta del chatbot: ${chatbotResponse.message.substring(0, 50)}...`);
  
  // Enviar la respuesta automáticamente por WhatsApp
  await sendMessage(phone, chatbotResponse.message);
}

// MANEJAR BOTONES INTERACTIVOS - MAPEA A TU CHATBOT
async function handleInteractiveMessage(phone: string, message: any) {
  const buttonId = message.interactive?.button_reply?.id;
  console.log(`🔘 Botón presionado: ${buttonId}`);

  // Mapeo de botones a respuestas de TU chatbot
  const buttonMap: Record<string, string> = {
    'btn_catalogo': 'productos',
    'btn_envios': 'envios', 
    'btn_pagos': 'pagos',
    'btn_horarios': 'horarios',
    'btn_productos': 'productos'
  };

  const responseKey = buttonMap[buttonId] || 'saludo';
  console.log(`🔍 Buscando respuesta para clave: ${responseKey}`);
  
  const chatbotResponse = findResponse(responseKey);
  await sendMessage(phone, chatbotResponse.message);
}

// =============================================
// 🚀 FUNCIÓN PARA ENVIAR MENSAJES
// =============================================

async function sendMessage(phone: string, text: string) {
  // Validar que tenemos las variables necesarias
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.error('❌ Faltan variables de entorno de WhatsApp');
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  const messageData = {
    messaging_product: 'whatsapp',
    to: phone,
    text: { body: text }
  };

  console.log(`📤 Enviando mensaje a ${phone}:`);
  console.log(`💭 "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    const result = await response.json();
    
    if (result.error) {
      console.error('❌ Error enviando mensaje:', result.error);
    } else {
      console.log('✅ Mensaje enviado exitosamente a WhatsApp');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error de conexión con Meta API:', error);
  }
}