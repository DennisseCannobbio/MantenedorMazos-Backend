/*
    RUTA: /api/login
*/

const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');

const router = Router();

router.post('/',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe ser obligatorio').not().isEmpty(),
            ],
            login
            )



module.exports = router;