// src/lib/chatbot-responses.ts
// 🚀 CHATBOT L & X MULTISERVICIOS – ACTUALIZADO CON SALUDO ESPECIAL

export interface ChatResponse {
  message: string;
  options?: string[];
}

// Palabras clave que el chatbot entenderá
export const KEYWORDS = {
  // Saludos
  saludos: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi', 'saludo'],

  // 🛠️ Soporte técnico
  soporte: [
    'soporte', 'mantenimiento', 'técnico', 'tecnico', 'reparación', 'reparacion', 'arreglar',
    'pc', 'computadora', 'ordenador', 'laptop', 'impresora', 'impresoras', 'formateo',
    'cámara', 'camara', 'cámaras', 'camaras', 'seguridad', 'circuito', 'instalar windows',
    'instalacion camaras', 'instalación cámaras'
  ],

  // 🎨 Sublimación / Personalizados
  sublimacion: [
    'sublimación', 'sublimacion', 'sublimar', 'estampar', 'personalizar', 'personalizado',
    'tazas sublimadas', 'taza personalizada', 'cojines personalizados', 'gorras sublimadas'
  ],

  // 👕 Ropa / Confección
  ropa: [
    'ropa', 'confección', 'confeccion', 'uniformes', 'uniforme', 'conjunto deportivo',
    'conjuntos deportivos', 'ropa deportiva', 'deportivo'
  ],

  // Productos generales
  productos: ['producto', 'productos', 'catálogo', 'catalogo', 'qué tienen', 'precios'],

  // Productos específicos
  sueter: ['suéter', 'sueter', 'sweater'],
  camiseta: ['camiseta', 'camisa', 'playera', 'polera'],
  buso: ['buso', 'buzo', 'sudadera', 'hoodie'],
  taza: ['taza', 'tazas', 'mug'],
  cojin: ['cojín', 'cojin', 'cojines'],
  tomatodo: ['tomatodo', 'termo', 'botella'],
  conjunto: ['conjunto', 'terno', 'set', 'combo'],

  // Envíos
  envios: ['envío', 'envio', 'enviar', 'entrega', 'servientrega', 'cooperativa', 'costo envío', 'costo envio'],

  // Pagos
  pagos: ['pago', 'pagos', 'transferencia', 'qr', 'efectivo', 'banco', 'cuenta'],

  // Horarios / Ubicación
  horarios: [
    'horario', 'horarios', 'atención', 'atencion', 'abierto', 'cierra',
    'ubicación', 'ubicacion', 'dirección', 'direccion', 'maps'
  ],

  // Despedidas
  despedidas: ['gracias', 'bye', 'adios', 'adiós', 'chao', 'nos vemos']
};

// =============================
// RESPUESTAS PERSONALIZADAS
// =============================

export const RESPONSES: Record<string, ChatResponse> = {

  // 👋 SALUDO ESPECIAL (EL QUE ELEGISTE)
  'saludo': {
    message: `👋 ¡Hola! Bienvenido a *L & X Multiservicios*, donde *innovamos contigo* 💡✨

Soy Luis Enrique, tu asistente virtual 🤖  
Estoy aquí para ayudarte con:

🛠️ Soporte técnico (computadoras, impresoras, cámaras)  
🎨 Sublimación y personalizados  
👕 Confección y venta de ropa  
📦 Envíos rápidos y seguros  
💰 Pagos por transferencia o QR  
📍 Ubicación y horarios del local

Solo dime qué necesitas, ¡y vamos al grano como diría el dermatólogo! 😄`,
    options: ['soporte', 'sublimación', 'ropa', 'productos', 'envíos', 'pagos', 'horarios']
  },

  // Alias para "saludos"
  'saludos': {
    message: `👋 ¡Hola! Bienvenido a *L & X Multiservicios*, donde *innovamos contigo* 💡✨

Soy Luis Enrique, tu asistente virtual 🤖  
Estoy aquí para ayudarte con:

🛠️ Soporte técnico  
🎨 Sublimación  
👕 Ropa  
📦 Envíos  
💰 Pagos  
📍 Horarios / Ubicación

Dime qué necesitas 😄`,
    options: ['soporte', 'sublimación', 'ropa', 'productos', 'envíos', 'pagos', 'horarios']
  },

  // 🛠️ SOPORTE TÉCNICO
  'soporte': {
    message: `🛠️ *SOPORTE TÉCNICO Y MANTENIMIENTO*

Le ayudamos con:
• Reparación y mantenimiento de computadoras y laptops 💻  
• Instalación y configuración de impresoras 🖨️  
• Formateo, limpieza interna, optimización 🧹  
• Instalación de cámaras de seguridad 🎥

Cuénteme brevemente su problema para asistirle 😊`
  },

  // 🎨 SUBLIMACIÓN
  'sublimacion': {
    message: `🎨 *SUBLIMACIÓN Y PERSONALIZACIÓN*

Realizamos:
• Tazas sublimadas ☕  
• Cojines personalizados 🛋️  
• Camisetas y busos con diseño 👕  
• Gorras y tomatodos 🎁  

Puede enviarnos su diseño o idea 🙂`
  },

  // 👕 ROPA
  'ropa': {
    message: `👕 *CONFECCIÓN Y VENTA DE ROPA*

Disponibles:
• Suéteres y buzos  
• Camisetas  
• Conjuntos deportivos  
• Uniformes personalizados  

Indíqueme la prenda, talla y cantidad 😊`
  },

  // 📦 CATÁLOGO COMPLETO
  'productos': {
    message: `📦 *CATÁLOGO COMPLETO - L & X MULTISERVICIOS*

👕 *ROPA:*
• Suéter Hombre: $12  
• Suéter Mujer: $8  
• Camiseta Hombre/Mujer: $5  
• Busos Estampados: $10  
• Conjuntos Estampados: $22  

☕ *ARTÍCULOS PERSONALIZADOS:*
• Tazas Personalizadas: $3.50  
• Tazas Sublimadas: $2.50  
• Cojines Sublimados: $3.00  
• Tomatodos Personalizados: $3.50  

¿Qué producto desea ver? 😊`
  },

  // 🔹 SUÉTERES
  'sueter': {
    message: `🧥 *SUÉTERES / BUZOS L & X Multiservicios*\n\n` +
    `👕 *Suéter Hombre*: $12\n` +
    `👚 *Suéter Mujer*: $8\n\n` +
    `Disponibles en varias tallas y colores.\n` +
    `Dígame modelo, talla y cantidad para ayudarle 😊`
  },

  // 🔹 CAMISETAS
  'camiseta': {
    message: `👕 *CAMISETAS PERSONALIZADAS*\n\n` +
    `• Camiseta hombre/mujer: $5\n` +
    `• Estampado a un color incluido\n\n` +
    `Puede indicarme talla (S, M, L, XL) y si desea diseño personalizado.`
  },

  // 🔹 BUSOS / HOODIES
  'buso': {
    message: `🧥 *BUSOS / HOODIES PERSONALIZADOS*\n\n` +
    `• Busos estampados: $10\n` +
    `• Conjuntos estampados: $22\n\n` +
    `Dígame si busca para dama, caballero o niño, y la talla aproximada.`
  },

  // 🔹 TAZAS
  'taza': {
    message: `☕ *TAZAS PERSONALIZADAS*\n\n` +
    `• Tazas sublimadas: $2.50\n` +
    `• Tazas personalizadas (foto, frase, logo): $3.50\n\n` +
    `Puede enviarnos la imagen o el texto que desea estampar 😊`
  },

  // 🔹 COJINES
  'cojin': {
    message: `🛋️ *COJINES PERSONALIZADOS*\n\n` +
    `• Cojines sublimados: $3.00\n\n` +
    `Perfectos para regalos o decoración.\n` +
    `Dígame cantidad y si tiene algún diseño en mente.`
  },

  // 🔹 TOMATODOS / TERMOS
  'tomatodo': {
    message: `🥤 *TOMATODOS / TERMOS PERSONALIZADOS*\n\n` +
    `• Tomatodos personalizados: $3.50\n\n` +
    `Ideales para regalos, promociones o uso personal.\n` +
    `Indíqueme cuántos necesita y si llevan logo o nombre.`
  },

  // 🔹 CONJUNTOS
  'conjunto': {
    message: `👕 *CONJUNTOS DEPORTIVOS / ESTAMPADOS*\n\n` +
    `• Conjuntos estampados: $22\n\n` +
    `Puede indicarme talla, color y si desea personalización con nombre o número.`
  },

  // 🚚 ENVÍOS
  'envios': {
    message: `🚚 *ENVÍOS - RIOBAMBA Y SIERRA ECUATORIANA*

📍 *ENVÍOS LOCALES:*  
$2.00 - $2.50 según distancia

🏔️ *ENVÍOS A PROVINCIAS DE LA SIERRA:*  
Tiempo: 1 a 3 días  
Costo: Según Cooperativa o Servientrega

Indíqueme su ciudad para cotizar 😊`
  },

  // 💳 PAGOS
  'pagos': {
    message: `💳 *MÉTODOS DE PAGO DISPONIBLES*

🏦 *Banco Guayaquil – Cuenta de Ahorros*  
• Nº: 0041529712  
• Titular: Luis Enrique Reina Mesa  
• CI: 1762373601  

📱 *Pago con QR* (Banco Guayaquil)  
💵 *Efectivo* (al retirar en local)

¿Cuál método prefiere? 😊`
  },

  // 🕒 HORARIOS Y UBICACIÓN
  'horarios': {
    message: `🕒 *HORARIOS DE ATENCIÓN*

🏪 *LOCAL:*  
• Lunes a Viernes: 9:00 AM – 6:00 PM  
• Sábados: 9:00 AM – 2:00 PM  
• Domingos: Cerrado

📱 *WhatsApp:*  
7:00 AM – 9:00 PM

📍 *DIRECCIÓN:*  
Olmedo #22 y Amsterdam, Barrio Santa Ana  
Frente a bodegas CNT – Riobamba

📌 Maps:  
https://maps.google.com/?q=L+%26+X+Multiservicios+Riobamba`
  },

  // Despedida
  'despedida': {
    message: `¡Gracias por elegir L & X Multiservicios! 😊  
Si necesita algo más, estoy aquí para ayudarle.`
  },

  // DEFAULT
  'default': {
    message: `No entendí su mensaje 😅

📋 Puede escribir:  
• "soporte"  
• "sublimación"  
• "ropa"  
• "productos"  
• "envíos"  
• "pagos"  
• "horarios"

Estoy para servirle 😊`
  }
};

// =============================
// BUSCADOR DE RESPUESTA
// =============================

export function findResponse(userMessage: string): ChatResponse {
  const msg = userMessage.toLowerCase().trim();

  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(k => msg.includes(k))) {
      return RESPONSES[key] || RESPONSES['default'];
    }
  }

  return RESPONSES['default'];
}

export function getResponse(key: string): ChatResponse {
  return RESPONSES[key] || RESPONSES['default'];
}
