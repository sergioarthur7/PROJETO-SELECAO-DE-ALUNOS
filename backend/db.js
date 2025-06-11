import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '45.132.157.103', // IP do seu servidor Hostinger
  user: 'u981546547_kaio',
  password: '8;KUYNI?We',
  database: 'u981546547_selecao2',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
