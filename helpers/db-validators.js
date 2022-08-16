const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '')=> {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const esEmailValido = async(correo='')=>{
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${correo} está registrado en la DB`)
    }
}

const esIdValido = async(id='')=>{
    const existeUsuario = await Usuario.findById({ id });
    if( !existeUsuario ){
        throw new Error(`El id ${id} no está registrado en la DB`)
    }
}

module.exports = {
    esRoleValido,
    esEmailValido,
    esIdValido
}