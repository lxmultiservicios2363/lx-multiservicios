// src/lib/chatbot-responses.ts
// ✅ BASE DE CONOCIMIENTO ACTUALIZADA CON DIRECCIÓN EXACTA

export interface ChatResponse {
  message: string;
  options?: string[];
}

// Palabras clave que el chatbot entenderá
export const KEYWORDS = {
  // Saludos
  saludos: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi'],
  
  // Productos
  productos: ['producto', 'productos', 'catálogo', 'qué tienen', 'precios', 'catalogo'],
  sueter: ['suéter', 'sueter', 'sweater', 'suetere'],
  camiseta: ['camiseta', 'camisa', 'playera', 'polera'],
  buso: ['buso', 'sudadera', 'hoodie', 'buzo'],
  taza: ['taza', 'tazas', 'mug', 'tacita'],
  cojin: ['cojín', 'cojin', 'almohadón', 'cojines'],
  tomatodo: ['tomatodo', 'termo', 'botella', 'vaso'],
  conjunto: ['conjunto', 'terno', 'set', 'combo'],
  
  // Envíos
  envios: ['envío', 'envio', 'enviar', 'entrega', 'servientrega', 'cooperativa', 'transporte', 'costo envío'],
  
  // Pagos
  pagos: ['pago', 'pagos', 'transferencia', 'qr', 'efectivo', 'banco', 'cuenta'],
  
  // Horarios
  horarios: ['horario', 'horarios', 'atención', 'atencion', 'abierto', 'cierra', 'ubicación', 'ubicacion', 'dirección', 'maps'],
  
  // Despedidas
  despedidas: ['gracias', 'bye', 'adiós', 'adios', 'chao', 'nos vemos']
};

// Respuestas del chatbot
export const RESPONSES: Record<string, ChatResponse> = {
  // Saludo inicial
  'saludo': {
    message: `¡Hola! Soy Luis Enrique 🤖 de L & X Multiservicios.

¿En qué puedo ayudarle hoy?

📋 *MENÚ RÁPIDO:*
• Escriba "productos" para ver nuestro catálogo
• Escriba "envíos" para información de entregas  
• Escriba "pagos" para métodos de pago
• Escriba "horarios" para ubicación y atención

¡Estamos para servirle! 😊`,
    options: ['productos', 'envíos', 'pagos', 'horarios']
  },

  // Catálogo de productos
  'productos': {
    message: `📦 *CATÁLOGO COMPLETO - L & X MULTISERVICIOS*

👕 *ROPA:*
• Suéter Hombre: $12.00 (Tallas M, L, XL)
• Suéter Mujer: $8.00 (Tallas M, L, XL)  
• Camiseta Hombre: $5.00 (Tallas M, L, XL)
• Camiseta Mujer: $5.00 (Tallas M, L, XL)
• Busos Estampados: $10.00 (Tallas M, L, XL)
• Conjuntos Estampados: $22.00 (Tallas M, L, XL)

☕ *OTROS PRODUCTOS:*
• Tazas Personalizadas: $3.50 (11Oz)
• Tazas Sublimadas: $2.50 (11Oz)
• Cojines Sublimados: $3.00 (40x40cm)
• Tomatodos Personalizados: $3.50 (500ml)

¿Qué producto le interesa específicamente? 😊`,
    options: ['suéter', 'camiseta', 'buso', 'taza', 'cojín', 'tomatodo', 'conjunto']
  },

  // Información de envíos ACTUALIZADA
  'envios': {
    message: `🚚 *INFORMACIÓN DE ENVÍOS - RIOBAMBA*

📍 *ENVÍOS DESDE RIOBAMBA:*
• *Solo realizamos envíos a la Sierra*
• *No realizamos envíos a Guayaquil/ Costa*

📦 *ENVÍO LOCAL (Riobamba):*
• Costo: $2.00 - $2.50 (según distancia)
• Zonas urbanas de Riobamba
• Entrega en 24 horas

🏔️ *ENVÍO A PROVINCIAS DE LA SIERRA:*
• Costo: Lo determina Servientrega o Cooperativa de Transporte
• Provincias: Chimborazo, Tungurahua, Bolívar, Cotopaxi, etc.
• Tiempo: 1-3 días hábiles

Para cotización exacta necesitamos:
🏠 Provincia, ciudad y dirección exacta
📦 Peso y dimensiones del paquete

¿A qué provincia de la Sierra necesita el envío? 😊`,
    options: ['local riobamba', 'provincia sierra']
  },

  // Métodos de pago
  'pagos': {
    message: `💳 *MÉTODOS DE PAGO ACEPTADOS*

🏦 *TRANSFERENCIA BANCARIA:*
• Banco: Banco Guayaquil
• Cuenta: Ahorros 0041529712  
• Titular: Luis Enrique Reina Mesa
• Cédula: 1762373601

📱 *QR BANCO GUAYAQUIL:* Disponible
💵 *EFECTIVO:* Al recoger en local

Todos los pagos son confirmados vía WhatsApp para mayor seguridad.

¿Cuál método prefiere? 😊`,
    options: ['transferencia', 'qr', 'efectivo']
  },

  // Horarios y contacto ACTUALIZADO CON DIRECCIÓN EXACTA
  'horarios': {
    message: `🕒 *HORARIOS DE ATENCIÓN - L & X MULTISERVICIOS*

🏪 *HORARIO DEL LOCAL:*
• Lunes a Viernes: 9:00 AM - 6:00 PM
• Sábados: 9:00 AM - 2:00 PM  
• Domingos: Cerrado

📱 *ATENCIÓN WHATSAPP:*
• Lunes a Domingo: 7:00 AM - 9:00 PM

📍 *UBICACIÓN EXACTA:*
*L & X Multiservicios*
🗺️ https://maps.google.com/?q=L+%26+X+Multiservicios+Olmedo+22+y+Amsterdam+Santa+Ana+Riobamba

*Dirección:*
Olmedo #22 y Amsterdam, Barrio Santa Ana de la Dolorosa
Frente a las bodegas de CNT, Riobamba 060104

¿Necesita indicaciones más específicas? 😊`,
    options: ['maps', 'dirección', 'productos']
  },

  // Productos específicos ACTUALIZADOS
  'sueter': {
    message: `🧵 *SUÉTER DE HOMBRE/MUJER*

💰 *Precio:*
• Hombre: $12.00
• Mujer: $8.00

📏 *Tallas Disponibles:*
• M (Mediana)
• L (Grande)
• XL (Extra Grande)

⭐ *Calidad:*
Tejido premium, colores resistentes al lavado, costuras reforzadas

🚚 *Envío en Riobamba: $2.00 - $2.50*

¿Le interesa algún suéter en específico? 😊`,
    options: ['hombre', 'mujer', 'tallas']
  },

  'camiseta': {
    message: `👕 *CAMISETAS HOMBRE/MUJER*

💰 *Precio: $5.00* (igual para hombre y mujer)

📏 *Tallas Disponibles:*
• M (Mediana)
• L (Grande) 
• XL (Extra Grande)

⭐ *Calidad:*
Algodón 100%, resistente al lavado, colores duraderos

🚚 *Envío en Riobamba: $2.00 - $2.50*

¿De qué talla necesita? 😊`
  },

  'buso': {
    message: `🧥 *BUSOS ESTAMPADOS*

💰 *Precio: $10.00*

📏 *Tallas Disponibles:*
• M (Mediana)
• L (Grande)
• XL (Extra Grande)

⭐ *Calidad:*
Tela fleece premium, estampados duraderos, diseño unisex

🚚 *Envío en Riobamba: $2.00 - $2.50*

¿Qué talla le interesa? 😊`
  },

  // Despedida
  'despedida': {
    message: `¡Gracias por contactar a L & X Multiservicios! 😊

Si necesita algo más, no dude en escribirnos.

¡Que tenga un excelente día! 🌟`
  },

  // Respuesta por defecto
  'default': {
    message: `No entendí su mensaje. ¿Podría ser más específico?

📋 *Puede escribir:*
• "productos" para ver catálogo
• "envíos" para información de entregas
• "pagos" para métodos de pago  
• "horarios" para ubicación y atención

¡Estamos para ayudarle! 😊`,
    options: ['productos', 'envíos', 'pagos', 'horarios']
  }
};

// Función para encontrar la respuesta correcta
export function findResponse(userMessage: string): ChatResponse {
  const message = userMessage.toLowerCase().trim();
  
  // Buscar coincidencias con palabras clave
  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(keyword => message.includes(keyword))) {
      return RESPONSES[key] || RESPONSES['default'];
    }
  }
  
  // Si no encuentra coincidencia, respuesta por defecto
  return RESPONSES['default'];
}

// Función para obtener respuesta específica
export function getResponse(responseKey: string): ChatResponse {
  return RESPONSES[responseKey] || RESPONSES['default'];
}