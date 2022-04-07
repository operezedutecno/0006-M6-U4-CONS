const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, () => console.log('Server ON http://localhost:3000'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/empleados', (req, res) => {
    res.sendFile(`${__dirname}/empleados.json`);
});

app.post("/empleados", (req, res) => {
    let {rut, nombre, salario, horas_trabajadas} = req.body;
    let contenido = fs.readFileSync(`${__dirname}/empleados.json`, "utf8");
    contenido = JSON.parse(contenido);
    contenido.empleados.push({rut, nombre, salario, horas_trabajadas});
    contenido = JSON.stringify(contenido, null, 4);
    fs.writeFileSync(`${__dirname}/empleados.json`, contenido, "utf8");
    res.send("Empleado registrado con éxito");
});