const http = require('http');
const app = require('./app');

const port = 3000;

app.set('port', port);

// Manejo de errores de conneccion al servidor
const errorHandler = error => {
    if (error.syscall !== 'listen') throw error;

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevate privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () =>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('listening on ' + bind);
});

server.listen(port);