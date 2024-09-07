const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Biblioteca para hash de senhas

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

// Configurações para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'qw12',
  database: 'CampusAR'
});

// Estabelecendo a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID:', connection.threadId);
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  const obterUsuarioQuery = 'SELECT * FROM Usuarios WHERE usuario = ?';
  connection.query(obterUsuarioQuery, [usuario], (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
    
    if (resultados.length === 0) {
      console.log('Usuário não encontrado:', usuario);
      return res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuarioEncontrado = resultados[0];
    console.log('Usuário encontrado:', usuarioEncontrado);

    // Verificar a senha
    bcrypt.compare(senha, usuarioEncontrado.senha, (err, isPasswordCorrect) => {
      if (err) {
        console.error('Erro ao verificar senha:', err);
        return res.status(500).json({ mensagem: 'Erro ao verificar senha' });
      }

      if (!isPasswordCorrect) {
        console.log('Senha incorreta para usuário:', usuario);
        return res.status(400).json({ mensagem: 'Senha incorreta' });
      }

      console.log('Usuário logado:', usuario);
      const token = 'exemplo_token'; 
      res.json({ token });
    });
  });
});

// Rota de cadastro
app.post('/registrar', (req, res) => {
  const { nome, usuario, email, senha } = req.body;
  
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erro ao hash da senha:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }

    const cadastrarUsuarioQuery = 'INSERT INTO Usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)';
    connection.query(cadastrarUsuarioQuery, [nome, usuario, email, hashedPassword], (err, resultado) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
      }
      console.log('Usuário cadastrado com sucesso!');
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  });
});
const connectedUsers = {};

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('set username', (username) => {
    connectedUsers[socket.id] = username;
    io.emit('user list', Object.values(connectedUsers));
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
    delete connectedUsers[socket.id];
    io.emit('user list', Object.values(connectedUsers));
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
