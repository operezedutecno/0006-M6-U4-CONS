const express = require('express');
const app = express();

app.listen(3000, () => console.log('Server ON http://localhost:3000'));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/empleados', (req, res) => {
    res.sendFile(`${__dirname}/empleados.json`);
});