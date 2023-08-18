
import mysql from 'mysql2/promise';
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommercedatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export default pool;


