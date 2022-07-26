const { response } = require('express');
const Mazo = require('../models/Mazo');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const getAllMazos = async (req, res = response) => {
    const mazos = await Mazo.find();

    const total = await Mazo.count();

    res.json({
        ok: true,
        mazos,
        total
    })
}

const createMazo = async (req, res = response ) => {

    const { nombre, descripcion, colores, calificacion, poseeForro, estado, tipo, ubicacion } = req.body;

    try {

    // Procesar la imagen
    const file = req.files.foto;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/mazos/${ nombreArchivo }`

    // Mover la imagen
    file.mv( path , (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    });
        
    const mazo = new Mazo(req.body);

    await mazo.save()

    // Obtengo el id del mazo creado
    const id = mazo.id;

    // Actualizar imagen luego de crear el mazo
    await actualizarImagen('mazos', id, nombreArchivo);

    res.json({
        ok: true,
        data: 'Mazo agregado correctamente!'
    })

    } catch (error) {
        res.json({
            ok: false,
            data: error
        })
    }
    
}

const updateMazo = async(req, res = response) => {
    
}

module.exports = {
    getAllMazos,
    createMazo
}


