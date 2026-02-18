
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkImages() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        });

        console.log('Connected. Querying meals for image_url...');
        const [rows] = await connection.execute('SELECT id, title, image_url FROM meals LIMIT 5');
        console.log('Meal Images:', rows);

        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkImages();
