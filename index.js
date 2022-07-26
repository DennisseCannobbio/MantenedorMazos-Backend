require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { dbConnection } = require('./database/confing');

// Crear Servidor de Express
const app = express();

// Configurar CORS
app.use(cors());

// Lecutra y parseo del body
app.use(express.json());

// Base de Datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto ' + 3000)
})