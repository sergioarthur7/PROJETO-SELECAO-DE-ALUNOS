// 📁 backend/db.js
import mysql from 'mysql2/promise';

export default async function getConnection() {
  return await mysql.createConnection({
    host: 'us-east.connect.psdb.io',
    user: 'u981546547_kaio', // substitua pelo usuário gerado pelo PlanetScale
    password: '8;KUYNI?We',  // substitua pela senha gerada
    database: 'u981546547_selecao2', // nome do banco no PlanetScale
    ssl: {
      rejectUnauthorized: true, // 🔒 necessário para conexões seguras
    },
  });
}
