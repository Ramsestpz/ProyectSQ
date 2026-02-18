
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function updateMealDates() {
    let connection;
    try {
        const connectionConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        };
        console.log('Connecting with config:', { ...connectionConfig, password: '***' });

        connection = await mysql.createConnection(connectionConfig);

        console.log('Connected to database.');

        // Get current date (set to start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log(`Target start date: ${today.toISOString().split('T')[0]}`);

        // Get the earliest meal date
        const [rows] = await connection.execute('SELECT MIN(date) as min_date FROM meals');

        if (!rows || rows.length === 0 || !rows[0].min_date) {
            console.log('No meals found.');
            return;
        }

        const minDateStr = rows[0].min_date;
        const minDate = new Date(minDateStr);
        console.log(`Current earliest meal date: ${minDate.toISOString().split('T')[0]}`);

        // Calculate difference in days
        const diffTime = today.getTime() - minDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        console.log(`Shifting dates by ${diffDays} days.`);

        if (diffDays === 0) {
            console.log('Dates are already correct.');
            return;
        }

        await connection.execute('UPDATE meals SET date = DATE_ADD(date, INTERVAL ? DAY)', [diffDays]);
        console.log('Meal dates updated successfully.');

        await connection.execute('UPDATE daily_stats SET date = DATE_ADD(date, INTERVAL ? DAY)', [diffDays]);
        console.log('Daily stats updated successfully.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

updateMealDates();
