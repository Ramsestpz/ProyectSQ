
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkTodayMeals() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        });

        const todayStr = new Date().toISOString().split('T')[0];
        console.log('Checking meals for date:', todayStr);

        const [rows] = await connection.execute(
            'SELECT id, title, image_url FROM meals WHERE date = ?',
            [todayStr]
        );
        console.log('Meals for today:', rows);

        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkTodayMeals();
