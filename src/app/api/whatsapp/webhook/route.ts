import { NextRequest, NextResponse } from 'next/server';

// VERIFICACIÓN DEL WEBHOOK (GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🔐 Verificando webhook...', { mode, token });

  // Verificar que coincida el token
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ Webhook verificado exitosamente');
    return new NextResponse(challenge, { status: 200 });
  }

  console.log('❌ Verificación fallida');
  return new NextResponse('Verification failed', { status: 403 });
}

// RECEPCIÓN DE MENSAJES (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📨 Mensaje recibido:', JSON.stringify(body, null, 2));

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

      // Procesar respuestas a botones interactivos
      if (value?.message_interactions) {
        for (const interaction of value.message_interactions) {
          await processInteraction(interaction);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  } catch (error) {
    console.error('❌ Error en webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PROCESAR MENSAJES DE TEXTO
async function processMessage(message: any) {
  const userPhone = message.from;
  const messageType = message.type;
  const messageText = message.text?.body?.toLowerCase() || '';

  console.log(`📱 Procesando mensaje de ${userPhone}: ${messageText}`);

  switch (messageType) {
    case 'text':
      await handleTextMessage(userPhone, messageText);
      break;
    case 'interactive':
      await handleInteractiveMessage(userPhone, message);
      break;
    default:
      await sendMessage(userPhone, '¡Hola! 👋 Solo puedo procesar mensajes de texto por ahora. ¿En qué puedo ayudarte?');
  }
}

// MANEJAR MENSAJES DE TEXTO
async function handleTextMessage(phone: string, text: string) {
  console.log(`💬 Mensaje de texto: ${text}`);

  // Respuestas automatizadas basadas en palabras clave
  if (text.includes('hola') || text.includes('buenos') || text.includes('buenas')) {
    await sendWelcomeMessage(phone);
  } 
  else if (text.includes('catálogo') || text.includes('catalogo') || text.includes('producto')) {
    await sendCatalogMessage(phone);
  }
  else if (text.includes('precio') || text.includes('cuesta') || text.includes('valor')) {
    await sendPriceMessage(phone);
  }
  else if (text.includes('envío') || text.includes('envio') || text.includes('entrega')) {
    await sendShippingMessage(phone);
  }
  else if (text.includes('pago') || text.includes('transferencia') || text.includes('efectivo')) {
    await sendPaymentMessage(phone);
  }
  else if (text.includes('horario') || text.includes('atienden') || text.includes('disponible')) {
    await sendScheduleMessage(phone);
  }
  else if (text.includes('ubicación') || text.includes('ubicacion') || text.includes('dirección')) {
    await sendLocationMessage(phone);
  }
  else if (text.includes('gracias') || text.includes('thank')) {
    await sendThankYouMessage(phone);
  }
  else {
    await sendDefaultMessage(phone);
  }
}

// MANEJAR MENSAJES INTERACTIVOS (BOTONES)
async function handleInteractiveMessage(phone: string, message: any) {
  const buttonId = message.interactive?.button_reply?.id;
  console.log(`🔘 Botón presionado: ${buttonId}`);

  switch(buttonId) {
    case 'btn_catalogo':
      await sendCatalogMessage(phone);
      break;
    case 'btn_envios':
      await sendShippingMessage(phone);
      break;
    case 'btn_pagos':
      await sendPaymentMessage(phone);
      break;
    case 'btn_horarios':
      await sendScheduleMessage(phone);
      break;
    default:
      await sendWelcomeMessage(phone);
  }
}

// PROCESAR INTERACCIONES
async function processInteraction(interaction: any) {
  console.log('🔄 Procesando interacción:', interaction);
  // Aquí puedes agregar lógica para interacciones más complejas
}

// =============================================
// 🎯 RESPUESTAS AUTOMATIZADAS
// =============================================

// MENSAJE DE BIENVENIDA
async function sendWelcomeMessage(phone: string) {
  const message = `¡Hola! 👋 Bienvenido a *L & X Multiservicios* 😊

¿En qué puedo ayudarte hoy? Puedes preguntarme sobre:

📋 *Catálogo de productos*
💰 *Precios y ofertas*
🚚 *Envíos y entregas*
💳 *Métodos de pago*
📍 *Ubicación y horarios*

También puedes usar los botones rápidos en nuestro sitio web para obtener información instantánea.

*¡Estamos aquí para servirte!* 🛍️`;

  await sendMessage(phone, message);
}

// INFORMACIÓN DE CATÁLOGO
async function sendCatalogMessage(phone: string) {
  const message = `📦 *NUESTRO CATÁLOGO* 📦

Tenemos disponibles estos productos:

👕 *Ropa y Textiles:*
• Suéteres tejidos personalizados
• Busos y sudaderas con diseños únicos
• Camisetas estampadas

☕ *Artículos Personalizados:*
• Tazas con fotos o mensajes
• Cojines decorativos
• Tomatodos/térmicos
• Llaveros y más...

🎁 *Regalos para toda ocasión:*
• Cumpleaños
• Aniversarios
• Eventos especiales

*¿Te interesa algún producto en específico?* 😊`;

  await sendMessage(phone, message);
}

// INFORMACIÓN DE PRECIOS
async function sendPriceMessage(phone: string) {
  const message = `💰 *INFORMACIÓN DE PRECIOS* 💰

*Precios de referencia:*

👕 *Ropa:*
• Suéteres tejidos: Desde $15
• Busos/Sudaderas: Desde $12
• Camisetas: Desde $8

☕ *Personalizados:*
• Tazas: Desde $6
• Cojines: Desde $10
• Tomatodos: Desde $8

*Los precios pueden variar según:*
• Complejidad del diseño
• Materiales seleccionados
• Cantidad del pedido

*¿Qué producto te interesa para darte el precio exacto?* 📝`;

  await sendMessage(phone, message);
}

// INFORMACIÓN DE ENVÍOS
async function sendShippingMessage(phone: string) {
  const message = `🚚 *INFORMACIÓN DE ENVÍOS* 🚚

Realizamos envíos a través de:

📦 *Servientrega:*
• Cobertura nacional
• Seguimiento en tiempo real
• Entrega en 24-48 horas

💰 *Costos de envío:*
• Dependen de la ubicación
• Desde $3 (ciudad)
• Hasta $8 (provincias)

*Procedimiento:*
1. Confirmamos tu pedido
2. Generamos el código de envío
3. Te enviamos el tracking
4. ¡Recibes tu producto!

*¿De dónde nos escribes?* 📍`;

  await sendMessage(phone, message);
}

// MÉTODOS DE PAGO
async function sendPaymentMessage(phone: string) {
  const message = `💳 *MÉTODOS DE PAGO* 💳

Aceptamos las siguientes formas de pago:

🏦 *Transferencia Bancaria:*
• Banco Pichincha
• Banco Guayaquil
• Produbanco

📱 *Pago Móvil:*
• QR bancario
• Aplicaciones móviles

💵 *Efectivo:*
• Al momento de la entrega
• En nuestro local

*Proceso seguro:*
1. Confirmamos el total
2. Te enviamos los datos de pago
3. Verificamos la transacción
4. Preparamos tu pedido

*¿Cuál método prefieres?* 😊`;

  await sendMessage(phone, message);
}

// HORARIOS DE ATENCIÓN
async function sendScheduleMessage(phone: string) {
  const message = `🕒 *HORARIOS DE ATENCIÓN* 🕒

*Atención presencial:*
🏪 Lunes a Viernes: 8:00 AM - 6:00 PM
🏪 Sábados: 9:00 AM - 2:00 PM
🏪 Domingos: Cerrado

*WhatsApp 24/7:*
📱 Consultas: 24 horas
📱 Pedidos: Hasta 10:00 PM
📱 Respuesta inmediata

*¡Puedes escribirnos en cualquier momento!*
Te responderemos lo más pronto posible 😄`;

  await sendMessage(phone, message);
}

// UBICACIÓN
async function sendLocationMessage(phone: string) {
  const message = `📍 *NUESTRA UBICACIÓN* 📍

*L & X Multiservicios*

📞 *Teléfono:* +593 98 738 4110
📧 *Email:* lxmultiservicios@gmail.com

*Redes Sociales:*
📘 Facebook: /lxmultiserv
📷 Instagram: @lxmultiservicios

Puedes visitarnos o contactarnos por WhatsApp para coordinar tu pedido. También realizamos entregas a domicilio. 🛵`;

  await sendMessage(phone, message);
}

// AGRADECIMIENTO
async function sendThankYouMessage(phone: string) {
  const message = `¡De nada! 😊 

*Gracias por contactar a L & X Multiservicios*

Si necesitas algo más, no dudes en escribirnos. Estamos aquí para ayudarte.

*¡Que tengas un excelente día!* 🌟

*Equipo L & X Multiservicios* 🛍️`;

  await sendMessage(phone, message);
}

// MENSAJE POR DEFECTO
async function sendDefaultMessage(phone: string) {
  const message = `¡Hola! 😊 

Soy el asistente virtual de *L & X Multiservicios*. Puedo ayudarte con información sobre:

• 📋 Nuestros productos
• 💰 Precios y ofertas
• 🚚 Envíos y entregas
• 💳 Métodos de pago
• 📍 Ubicación y horarios

*¿En qué te puedo ayudar específicamente?* 

También puedes usar palabras como: "catálogo", "precios", "envíos" para respuestas más rápidas.`;

  await sendMessage(phone, message);
}

// =============================================
// 🚀 FUNCIÓN PARA ENVIAR MENSAJES
// =============================================

async function sendMessage(phone: string, text: string) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  const messageData = {
    messaging_product: 'whatsapp',
    to: phone,
    text: { body: text }
  };

  console.log(`📤 Enviando mensaje a ${phone}: ${text.substring(0, 50)}...`);

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
      console.log('✅ Mensaje enviado exitosamente');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}