import { NextRequest, NextResponse } from 'next/server';
import { findResponse, KEYWORDS } from '@/lib/chatbot-responses';

// =============================
// 🔐 CONFIG
// =============================
const VERIFY_TOKEN =
  process.env.WHATSAPP_VERIFY_TOKEN || 'lx_multiservicios_2024_token';

// =============================================
// ✅ VERIFICACIÓN DEL WEBHOOK (GET)
// =============================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🎯 === VERIFICACIÓN WEBHOOK ===');
  console.log('🔹 Mode:', mode);
  console.log('🔹 Token recibido:', token);
  console.log('🔹 Challenge:', challenge);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('🎉 ✅ WEBHOOK VERIFICADO EXITOSAMENTE!');
    return new NextResponse(challenge, { status: 200 });
  }

  console.log('❌ FALLA EN VERIFICACIÓN');
  console.log(
    '🔹 Razón:',
    token === VERIFY_TOKEN ? 'Mode incorrecto' : 'Tokens diferentes'
  );
  console.log('🔹 Token recibido:', token);
  console.log('🔹 Token esperado (env):', VERIFY_TOKEN);

  return new NextResponse('Verification failed', { status: 403 });
}

// =============================================
// 📥 RECEPCIÓN DE MENSAJES (POST)
// =============================================
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
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =============================================
// 🤖 LÓGICA DEL CHATBOT
// =============================================
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
      console.log('🔍 Usando respuesta por defecto del chatbot');
      const defaultResponse = findResponse('');
      await sendMessage(userPhone, defaultResponse.message);
  }
}

async function handleTextMessage(phone: string, text: string) {
  console.log(`🔍 Buscando respuesta para: "${text}"`);

  const chatbotResponse = findResponse(text);

  console.log(
    `🤖 Respuesta del chatbot: ${chatbotResponse.message.substring(0, 80)}...`
  );

  // Enviar la respuesta de texto
  await sendMessage(phone, chatbotResponse.message);

  // Si es un saludo, enviar también el MENÚ con BOTONES
  const lower = text.toLowerCase().trim();
  const isGreeting = KEYWORDS.saludos.some((keyword) => lower.includes(keyword));

  if (isGreeting) {
    console.log('🔘 Enviando menú con botones interactivos');
    await sendMainMenuButtons(phone);
  }
}

async function handleInteractiveMessage(phone: string, message: any) {
  const buttonId = message.interactive?.button_reply?.id;
  console.log(`🔘 Botón presionado: ${buttonId}`);

  const buttonMap: Record<string, string> = {
    btn_soporte: 'soporte',
    btn_sublimacion: 'sublimacion',
    btn_ropa: 'ropa',
    btn_catalogo: 'productos',
    btn_envios: 'envios',
    btn_pagos: 'pagos',
    btn_horarios: 'horarios',
    btn_productos: 'productos',
  };

  const responseKey = buttonMap[buttonId] || 'saludo';
  console.log(`🔍 Buscando respuesta para clave: ${responseKey}`);

  const chatbotResponse = findResponse(responseKey);
  await sendMessage(phone, chatbotResponse.message);
}

// =============================================
// 🚀 ENVIAR MENSAJE DE TEXTO
// =============================================
async function sendMessage(phone: string, text: string) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.error('❌ Faltan variables de entorno de WhatsApp');
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const messageData = {
    messaging_product: 'whatsapp',
    to: phone,
    text: { body: text },
  };

  console.log(`📤 Enviando mensaje a ${phone}:`);
  console.log(
    `💭 "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`
  );

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
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

// =============================================
// 🚀 ENVIAR MENÚ CON BOTONES
// =============================================
async function sendMainMenuButtons(phone: string) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.error('❌ Faltan variables de entorno de WhatsApp');
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: 'Elija una opción para continuar 👇',
      },
      footer: {
        text: 'L & X Multiservicios – Innovando contigo',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'btn_soporte',
              title: '🛠️ Soporte',
            },
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_sublimacion',
              title: '🎨 Sublimación',
            },
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_ropa',
              title: '👕 Ropa / Catálogo',
            },
          },
        ],
      },
    },
  };

  console.log(`📤 Enviando MENÚ con botones a ${phone}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.error) {
      console.error('❌ Error enviando botones interactivos:', result.error);
    } else {
      console.log('✅ Menú con botones enviado correctamente');
    }

    return result;
  } catch (error) {
    console.error('❌ Error de conexión con Meta API (botones):', error);
  }
}
