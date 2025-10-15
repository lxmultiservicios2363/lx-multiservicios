// src/utils/generateInvoice.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoice = async (orderData: any, customerEmail: string) => {
  // 1. Generar PDF con los datos de la orden
  // 2. Enviar por WhatsApp (API)
  // 3. Enviar por email (API)
};