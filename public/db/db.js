const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'regulus.cotuca.unicamp.br', 
  user: 'BD23538', 
  password: 'BD23538',
  database: 'BD23538'
});

/*
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'qw12',
  database: 'CampusAR'
});
*/


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID:', connection.threadId);
});

module.exports = connection;