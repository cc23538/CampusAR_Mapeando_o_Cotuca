const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const configureSocket = require('./socket'); 
const loginRegistroRouter = require('./public/rotas/Login_Registro'); 
const db = require('./public/db/db'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração do middleware de sessão
app.use(session({
  secret: 'senha', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configurações de segurança
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "https://code.jquery.com", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://stackpath.bootstrapcdn.com", "https://cdn.jsdelivr.net"],
    'img-src': ["'self'", "data:"],
    'connect-src': ["'self'"],  // Permite WebSocket
  },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


configureSocket(io);


app.use('/', loginRegistroRouter);


server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
