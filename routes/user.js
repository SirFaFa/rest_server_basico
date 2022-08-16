const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, esEmailValido, esIdValido } = require('../helpers/db-validators');
const router = Router();



router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( esIdValido ),
    check('rol').custom( esRoleValido ),
    //validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( esEmailValido ), 
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( esIdValido ),
    //validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;