const { PDFExtract } = require('pdf.js-extract');
const colors = require('colors')
const Diff = require('diff');

const pdf_1 = `pdfs/1.pdf`;
const pdf_2 = `pdfs/2.pdf`;

const self = module.exports = {
    getPdf1Content: () => new Promise((resolve, reject) => {
        const pdfExtract = new PDFExtract();
        const options = {};
        pdfExtract.extract(pdf_1, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const pagesOfPdf1 = data.pages;
                const countOfPagesOfPdf1 = pagesOfPdf1.length;
                const contentsOfPdf1 = [];
        
                for (let i = 0; i < countOfPagesOfPdf1; i++) {
                    contentsOfPdf1.push(...pagesOfPdf1[i].content);
                };

                const obj = {
                    meta: data?.meta?.info,
                    totalPages: countOfPagesOfPdf1,
                    content: contentsOfPdf1
                }
                resolve(obj);
            }
        });
    }),

    getPdf2Content: () => new Promise((resolve, reject) => {
        const pdfExtract = new PDFExtract();
        const options = {};

        pdfExtract.extract(pdf_2, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const pagesOfPdf2 = data.pages;
                const countOfPagesOfPdf2 = pagesOfPdf2.length;
                const contentsOfPdf2 = [];

                for (let j = 0; j < countOfPagesOfPdf2; j++) {
                    contentsOfPdf2.push(...pagesOfPdf2[j].content);
                }
                const obj = {
                    meta: data?.meta?.info,
                    totalPages: countOfPagesOfPdf2,
                    content: contentsOfPdf2
                }
                resolve(obj);
            }
        });
    }),

    checkDifferenceInContent: async (arr1, arr2) => {
        const pdf1_content_strings = [];
        const pdf2_content_strings = [];
    
        const diffMap = new Map();

        if (arr1.length || arr2.length) {
            const maxLength = Math.max(arr1.length, arr2.length); 
            for (let i = 0; i < maxLength; i++) {
                pdf1_content_strings.push(arr1[i]?.str || '');
                pdf2_content_strings.push(arr2[i]?.str || '');

                const obj = {};
                obj[`P1L${i}`] = arr1[i]?.str || 'NA';
                obj[`P2L${i}`] = arr2[i]?.str || 'NA';

                if (arr1[i]?.str !== arr2[i]?.str) {
                    diffMap.set(i, obj);
                }
            }

            const string1_for_compare = pdf1_content_strings.join(' ');
            const string2_for_compare = pdf2_content_strings.join(' ');

            const diff = Diff.diffChars(string1_for_compare, string2_for_compare);
            let colouredDiff;
            diff.forEach((part) => {
                const color = part?.added ? 'green' : part?.removed ? 'red' : 'grey';
                process.stderr.write(part.value[color]);
            });
            return diff;
        }

    },

    comparePdfs:async () => {
        try {
            const pdf1_data = await self.getPdf1Content();
            const pdf2_data = await self.getPdf2Content();
            
            const metaDifference = {
                pdf1_meta_info: pdf1_data.meta,
                pdf2_meta_info: pdf2_data.meta
            }

            const pagesDifference = {
                pdf1_total_pages: pdf1_data.totalPages,
                pdf2_total_pages: pdf2_data.totalPages
            }

            const difference = await self.checkDifferenceInContent(pdf1_data.content, pdf2_data.content);
            console.log({ metaDifference, pagesDifference })

            if (difference?.length) {
                return { success: true, result: { message: 'Files are different', difference: { difference }}}
            } else {
                return { success: true, result: { message: 'Files are identical', difference: {} } }
            }
        } catch (error) {
            console.log('Error while reading the contents of pdfs', error);
            return { success: false, message: 'Error occured while getting the contents of pdf' };
        }
    },
}
