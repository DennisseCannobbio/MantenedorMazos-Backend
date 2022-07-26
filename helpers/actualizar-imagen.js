const fs = require('fs');
const Usuario = require('../models/Usuario')
const Mazo = require('../models/Mazo')

const borrarImagen = ( path ) => {
    if(fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'mazos':
            const mazo = await Mazo.findById(id);
            if( !mazo ) {
                return false;
            }

            pathViejo = `./uploads/mazo/${ mazo.foto }`;
            borrarImagen(pathViejo);

            mazo.foto = nombreArchivo;
            await mazo.save();
            return true;

        break;

        case 'usuarios': 
            
            const usuario = await Usuario.findById(id);
            if(!usuario) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        
        break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}