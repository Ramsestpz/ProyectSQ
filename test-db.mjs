
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    console.log('Testing connection to:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        });

        console.log('Successfully connected to database!');

        const [rows] = await connection.execute('SHOW TABLES');
        console.log('Tables:', rows);

        await connection.end();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
