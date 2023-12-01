import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    db: mysql.createPool({
<<<<<<< HEAD
        host: process.env.DB_HOST,
=======
        host: '127.0.0.1',
        port: '3306',
>>>>>>> dev
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
};

export default dbConfig;