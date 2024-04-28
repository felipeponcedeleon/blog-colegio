const express = require('express');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // Middleware para parsear los datos del formulario

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

app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al obtener los posts');
        } else {
            console.log(results);
            res.render('posts', { posts: results });
        }
    });
});

app.get('/post', (req, res) => {
    res.render('new_post');
});

app.post('/post', (req, res) => {
    const { title, post } = req.body;
    const new_post = { title, post };

    db.query('INSERT INTO posts SET ?', new_post, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al crear el post');
        } else {
            console.log('Post creado:', result);
            res.redirect('/posts'); // Redireccionar a la página de listado de posts
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor corriendo en puerto 5000')
})