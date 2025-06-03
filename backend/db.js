import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  return connection;
}
