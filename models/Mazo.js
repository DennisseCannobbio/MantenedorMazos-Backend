const { Schema, model } = require('mongoose');

const MazoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    colores: {
        type: String,
        required: true
    },
    calificacion: {
        type: String,
        required: true,
    },
    poseeForro: {
        type: Boolean,
        required: true,
    },
    estado: {
        type: String,
        required: true
    },
    foto: {
        type: String,
    },
    tipo: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true
    },
    ubicacionImg: {
        type: String,
    }
})

module.exports = model('Mazo', MazoSchema);