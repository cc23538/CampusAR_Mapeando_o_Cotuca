const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const helmet = require('helmet');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurações de segurança
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "https://code.jquery.com", "https://cdn.jsdelivr.net", "https://stackpath.bootstrapcdn.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://stackpath.bootstrapcdn.com", 'https://cdn.jsdelivr.net', 'https://stackpath.bootstrapcdn.com'],
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
      if (err) return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
      
      if (resultados.length === 0) return res.status(400).json({ mensagem: 'Usuário não encontrado' });

      const usuarioEncontrado = resultados[0];

      if (senha !== usuarioEncontrado.senha) return res.status(400).json({ mensagem: 'Senha incorreta' });

      console.log('Usuário logado:', usuario);
      const token = 'exemplo_token'; 
      res.json({ token });
  });
});

// Rota de cadastro
app.post('/registrar', (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  const cadastrarUsuarioQuery = 'INSERT INTO Usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)';
  connection.query(cadastrarUsuarioQuery, [nome, usuario, email, senha], (err, resultado) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
    console.log('Usuário cadastrado com sucesso!');
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  });
});



// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
