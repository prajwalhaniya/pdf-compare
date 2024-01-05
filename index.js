const app = require('express')();
const PORT = 3005;

const services = require('./services/compareServices');

app.get('/compare-pdfs', async (req, res) => {
    const contents = await services.comparePdfs();
    const data = { contents };
    res.json(data);
})

app.listen(PORT, () => {
    console.log('Server is up & running at the port', PORT);
})
