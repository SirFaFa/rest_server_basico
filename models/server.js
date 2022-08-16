const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app =  express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'; 

        //Conectar db
        this.conectaDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        //Cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public' ) );
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }

    async conectaDB(){
        await dbConnection();
    }
}

module.exports = Server;