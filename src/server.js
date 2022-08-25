const Hapi = require ('@hapi/hapi');
const routes = require('./routes');

const init = async () =>{
    const server = Hapi.server({
        port: 5000 ,
        host: 'localhost',
        /**Cross-origin resource sharing (CORS) : Agar Aplikasi Client Bisa Mengakses Origin(alamat server) Yg Berbeda
         * mekanisme yang dapat membuat mereka saling berinteraksi
         */
        routes : {
            cors : {
                origin : ['*'],
            },
        },
    });

    server.route(routes);
    await server.start ();
    console.log(`Server Berjalan Pada ${server.info.uri}`);
}

init();