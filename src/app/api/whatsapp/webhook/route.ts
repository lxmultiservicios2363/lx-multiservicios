// REEMPLAZA TEMPORALMENTE solo la función GET con esto:
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🎯 === DEBUG COMPLETO ===');
  console.log('🔹 Mode:', mode);
  console.log('🔹 Token recibido:', `"${token}"`);
  console.log('🔹 Token esperado:', `"${process.env.WHATSAPP_VERIFY_TOKEN}"`);
  console.log('🔹 Challenge:', challenge);
  console.log('🔹 ¿Coinciden EXACTAMENTE?:', token === process.env.WHATSAPP_VERIFY_TOKEN);
  console.log('🔹 Longitud token recibido:', token?.length);
  console.log('🔹 Longitud token esperado:', process.env.WHATSAPP_VERIFY_TOKEN?.length);
  
  // VERIFICACIÓN FORZADA TEMPORAL
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('🎉 ✅ VERIFICACIÓN EXITOSA');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.log('❌ FALLA - Razón:');
    console.log('   - Mode correcto?:', mode === 'subscribe');
    console.log('   - Token correcto?:', token === process.env.WHATSAPP_VERIFY_TOKEN);
    console.log('   - Token recibido:', token);
    console.log('   - Token esperado:', process.env.WHATSAPP_VERIFY_TOKEN);
  }

  return new NextResponse('Verification failed', { status: 403 });
}