// backend/db.js
import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: '45.132.157.103',
  user: 'u981546547_kaio',
  password: '8;KUYNI?We',
  database: 'u981546547_selecao2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
