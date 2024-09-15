const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db/db');

const router = express.Router(); 

router.post('/login', (req, res) => {
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

router.post('/registrar', (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  if (!nome || !usuario || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

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

module.exports = router;
