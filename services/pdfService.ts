import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Improve quality
      useCORS: true, // Handle external images if any
      backgroundColor: '#0f172a', // Match app background color (mystic-dark)
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Create PDF
    // We create a PDF with the exact aspect ratio of the content to avoid awkward page breaks
    // This creates a "digital scroll" style PDF which is better for reading on devices
    // Convert px to mm (approx 1px = 0.264583 mm)
    const pxToMm = 0.264583;
    const pdfWidth = imgWidth * pxToMm;
    const pdfHeight = imgHeight * pxToMm;

    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return false;
  }
};