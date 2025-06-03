import mysql from 'mysql2/promise';

export default async function getConnection() {
  const connection = await mysql.createConnection({
    host: '45.132.157.103',
    user: 'u981546547_kaio',
    password: '8;KUYNI?We',
    database: 'u981546547_selecao2',
    port: 3306,
  });
  return connection;
}
