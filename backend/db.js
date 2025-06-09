import mysql from 'mysql2/promise';

export default async function getConnection() {
  return await mysql.createConnection({
    host: '45.132.157.103', // IP do seu servidor Hostinger
    user: 'u981546547_kaio',
    password: '8;KUYNI?We',
    database: 'u981546547_selecao2',
    port: 3306,
  });
}
