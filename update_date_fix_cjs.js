
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function updateMealDates() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        });

        console.log('Connected to database.');

        // Get current date (set to start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log(`Target start date: ${today.toISOString().split('T')[0]}`);

        // Get the earliest meal date
        const [rows] = await connection.execute('SELECT MIN(date) as min_date FROM meals');
        const minDateStr = rows[0].min_date;

        if (!minDateStr) {
            console.log('No meals found.');
            return;
        }

        const minDate = new Date(minDateStr);
        console.log(`Current earliest meal date: ${minDate.toISOString().split('T')[0]}`);

        // Calculate difference in days
        // We want minDate to become today
        const diffTime = today.getTime() - minDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        console.log(`Shifting dates by ${diffDays} days.`);

        if (diffDays === 0) {
            console.log('Dates are already correct.');
            return;
        }

        await connection.execute(`
            UPDATE meals 
            SET date = DATE_ADD(date, INTERVAL ? DAY)
        `, [diffDays]);

        console.log('Dates updated successfully.');

        // Update daily_stats dates as well
        await connection.execute(`
            UPDATE daily_stats 
            SET date = DATE_ADD(date, INTERVAL ? DAY)
        `, [diffDays]);
        console.log('Daily stats updated successfully.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

updateMealDates();
