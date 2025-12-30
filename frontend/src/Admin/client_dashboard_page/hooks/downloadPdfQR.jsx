/**
 * downloadPdfQR.jsx - hook to download pdf with qr code from client on client 
 * dashboard page
 */
import { jsPDF } from 'jspdf';

export default async function downloadPdfQR(qrCode, qrCodeAddress) {
    const doc = new jsPDF();
        
    doc.setFontSize(18);
    doc.text(`Address: ${qrCodeAddress}`, 20, 30);
    doc.text(`Scan this QR Code for the employee log form.`, 20, 20);
        
    doc.addImage(qrCode, 'PNG', 20, 30, 100, 100);
    
    doc.save(`qr-code-${qrCodeAddress}.pdf`);
}