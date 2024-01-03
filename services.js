const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const PDFParser = require('pdf2json');

const pdf_1 = `pdfs/1.pdf`;
const pdf_2 = `pdfs/2.pdf`;

const pdfData_1 = fs.readFileSync(pdf_1);
const pdfData_2 = fs.readFileSync(pdf_2);

const self = module.exports = {
    getPagesCount: async () => {
        try {
            const pdfDoc_1 = await PDFDocument.load(pdfData_1, {
                updateMetadata: false
            });
            
            const pdfDoc_2 = await PDFDocument.load(pdfData_2, {
                updateMetadata: false
            });
            
            const pageCountOfPdf_1 = pdfDoc_1.getPageCount();
            const pageCountOfPdf_2 = pdfDoc_2.getPageCount();
            
            if (pageCountOfPdf_1 === pageCountOfPdf_2) {
                return { success: true, message: 'Pages are equal' };
            }
            return { success: false, message: 'Pages are not equal' };
        } catch (error) {
            console.log('Error while getting the pages count', error);
            return { success: false, message: 'Error while getting the pages count' };
        }
    },
    
    getMetadata: async () => {
        try {
            const pdfParser_1 = new PDFParser();
            const pdfParser_2 = new PDFParser();
            
            pdfParser_1.loadPDF(pdf_1);
            pdfParser_1.on("readable", meta => console.log("PDF_1 Metadata", meta) );
            
            pdfParser_2.loadPDF(pdf_2);
            pdfParser_2.on("readable", meta => console.log("PDF_2 Metadata", meta) );

        } catch (error) {
            console.log('Error while getting the contents of the pdfs', error);
            return { success: false, message: 'Error occurred while getting the contents of the pdfs' };
        }
    },

    getPdf1Content: () => new Promise((resolve, reject) => {
        const pdfParser_1 = new PDFParser();
        pdfParser_1.loadPDF(pdf_1);
        pdfParser_1.on("data", page => resolve(page));
    }),

    getPdf2Content: () => new Promise((resolve, reject) => {
        const pdfParser_2 = new PDFParser();
        pdfParser_2.loadPDF(pdf_2);
        pdfParser_2.on("data", page => resolve(page));
    }),

    getContents:async () => {
        try {
            const pdf1_content = await self.getPdf1Content();
            const pdf2_content = await self.getPdf2Content();
            console.log({ pdf1_content, pdf2_content });
        } catch (error) {
            console.log('Error while reading the contents of pdfs', error);
            return { success: false, message: 'Error occured while getting the contents of pdf' };
        }
    }
}