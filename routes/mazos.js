/*
    Ruta: /api/mazos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');
const { getAllMazos, createMazo } = require('../controllers/mazos')

const router = Router();


router.use(expressFileUpload());

router.get('/', validarJWT, getAllMazos);

router.post('/', validarJWT,
            [
                check('nombre', 'El nombre del mazo es obligatorio').not().isEmpty(),
                check('descripcion', 'La descripcion del mazo es obligatoria').not().isEmpty(),
                check('colores', 'El mazo debe contener al menos un color').not().isEmpty(),
                check('calificacion', 'La calificacion del mazo es obligatoria').not().isEmpty(),
                check('poseeForro', 'Debe seleccionar si el mazo posee o no forro').not().isEmpty(),
                check('estado', 'Debe ingresar el estado del mazo').not().isEmpty(),
                check('tipo', 'Debe ingresar el tipo de mazo').not().isEmpty(),
                check('ubicacion', 'Debe ingresar la ubicacion del mazo').not().isEmpty(),
                validarCampos
            ],
            createMazo);

module.exports = router;