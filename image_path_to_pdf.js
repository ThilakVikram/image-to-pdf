const fs = require('fs');
const PDFDocument = require('pdfkit');
const imageToBase64String = require('image-to-base64');

// ...
// Main function to convert multiple images to a single PDF
async function convertImagesToPdf(imagePaths, pdfPath,res) {
    try {
      const imageBase64Array = await Promise.all(imagePaths.map(imageToBase64String));
      createPDF(imageBase64Array, pdfPath);
      return res("Completed");
    } catch (error) {
      console.error('Error converting images to PDF:', error);
    }
  }
  
  // ...
  
  // Call the main function to start the conversion process
  // const imagePaths = ['./1.jpg', './1.jpg', './1.jpg'];
  // const pdfPath = './1.pdf';
  // convertImagesToPdf(imagePaths, pdfPath);
// ...

// Function to create a PDF document and add the images to it
function createPDF(imageBase64Array, pdfPath) {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
  
    doc.pipe(writeStream);
  
    // Add each image to the PDF
    imageBase64Array.forEach((imageBase64, index) => {
      if (index !== 0) {
        doc.addPage(); // Add a new page for each subsequent image
      }
      doc.image(Buffer.from(imageBase64, 'base64'), {
        fit: [500, 500], // Set the image size in the PDF (width, height)
      });
    });
  
    doc.end();
  
    writeStream.on('finish', () => {
      console.log('PDF created successfully.');
    });
  
    writeStream.on('error', (err) => {
      console.error('Error creating PDF:', err);
    });
  }
  
  // ...
    
  module.exports = convertImagesToPdf;