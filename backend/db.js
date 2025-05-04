const mysql = require('mysql');

const db = mysql.createConnection({
  host: '45.132.157.103',
  user: 'u981546547_kaio',
  password: '8;KUYNI?We',
  database: 'u981546547_selecao2',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

module.exports = db;
