const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('MySQL conectado.')
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
});

app.listen(5000, () => {
    console.log('Servidor corriendo en puerto 5000')
})