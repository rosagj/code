const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'usuarios_bd',
    user:'root',
    password: 'mysql'
});
const urlencodedParser = bodyParser.urlencoded({extended: false});
conexion.connect(function(error){
    if (error){
        throw error;
    }else{
        console.log('Conexion exitosa')
    }
})
app.get('/', urlencodedParser, (req, res) =>{
    var nombre = req.query.nombre;
    var apellido = req.query.apellido;
    res.send(`<h1>Tus datos son: <br/>
    Nombre: ${nombre} <br/>
    Apellido: ${apellido} </h1>`);
    const data = req.query;
    conexion.query('INSERT INTO datos set ?',[data], (error, rows)=>{
        console.log(rows);
    })
    console.log(req.query);
});

app.get('/list', urlencodedParser, (req, res) =>{
    conexion.query('SELECT * FROM datos', function(error, resultados, campos){
        if (error){
            throw error;
        }
        var valores = "";
        resultados.forEach(resultado => {
           valores += JSON.stringify(resultado);
            console.log(resultado);
        });
        res.send(`<h1>Los datos son: <br/>
        ${valores} <br/></h1>`)
    })
});

app.listen(3000, () =>{
    console.log('Server iniciado...');
});
