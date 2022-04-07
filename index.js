const express = require('express');
const app = express();
const fs = require('fs');
const { send } = require('process');

app.listen(3000, () => console.log('Server ON http://localhost:3000'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/empleados', (req, res) => {
    res.sendFile(`${__dirname}/empleados.json`);
});

app.use("/empleados", (req, res, next) => {
    let {rut, nombre, salario, horas_trabajadas} = req.body;
    if (rut == '') {
        res.status(400).send("Debe ingresar Rut")
    } else if (nombre == ''){
        res.status(400).send("Debe ingresar Nombre")
    } else if (salario == ''){
        res.status(400).send("Debe ingresar Salario")
    } else if (horas_trabajadas == ''){
        res.status(400).send("Debe ingresar Horas Trabajadas")
    } else if (isNaN(salario)){
        res.status(400).send("Debe ingresar un valor numerico a Salario")
    } else if (isNaN(horas_trabajadas)){
        res.status(400).send("Debe ingresar un valor numerico a Horas Trabajadas")
    } else {
        next()
    }
})
app.post("/empleados", (req, res) => {
    let {rut, nombre, salario, horas_trabajadas} = req.body;
    let contenido = fs.readFileSync(`${__dirname}/empleados.json`, "utf8");
    contenido = JSON.parse(contenido);
    contenido.empleados.push({rut, nombre, salario, horas_trabajadas});
    contenido = JSON.stringify(contenido, null, 4);
    fs.writeFileSync(`${__dirname}/empleados.json`, contenido, "utf8");
    res.send("Empleado registrado con éxito");
});