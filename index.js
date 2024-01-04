const app = require('express')();
const PORT = 3005;

const fs = require('fs');
const services = require('./services');


app.get('/', async (req, res) => {
    const pdf_1 = `pdfs/1.pdf`;
    const pdf_2 = `pdfs/2.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.send(fs.readFileSync(pdf_1));
});

app.get('/compare-pdfs', async (req, res) => {
    const pagesCount = await services.getPagesCount();
    const metadata = await services.getMetadata();
    const contents = await services.getContents();

    const data = { pagesCount, metadata, contents };
    res.json(data);
})

app.listen(PORT, () => {
    console.log('Server is up & running at the port', PORT);
})
