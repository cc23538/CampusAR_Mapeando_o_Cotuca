const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'qw12',
  database: 'CampusAR'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID:', connection.threadId);
});

module.exports = connection;