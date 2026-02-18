
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
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

        // Get current date
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        console.log(`Updating meals to start from ${todayStr}...`);

        // We want to map:
        // '2024-06-01' -> Today
        // '2024-06-02' -> Today + 1
        // '2024-06-03' -> Today + 2
        // ... and so on

        // First, let's see what dates we have
        const [dates]: any[] = await connection.execute('SELECT DISTINCT date FROM meals ORDER BY date');
        console.log('Found dates:', dates.map((d: any) => d.date));

        if (dates.length === 0) {
            console.log('No meals found to update.');
            return;
        }

        const baseDate = new Date(dates[0].date);

        // Calculate difference in days between first meal date and today
        const diffTime = Math.abs(today.getTime() - baseDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Check if we need to add or subtract (though likely add if data is from 2024)
        const isFuture = baseDate > today;
        const offset = isFuture ? -diffDays : diffDays;

        console.log(`Shifting dates by ${offset} days.`);

        // Update all meals
        // MySQL DATE_ADD syntax: DATE_ADD(date, INTERVAL value DAY)
        await connection.execute(`
            UPDATE meals 
            SET date = DATE_ADD(date, INTERVAL ? DAY)
        `, [offset]);

        console.log('Dates updated successfully.');

        // Verify
        const [newDates]: any[] = await connection.execute('SELECT DISTINCT date FROM meals ORDER BY date LIMIT 5');
        console.log('New dates sample:', newDates.map((d: any) => d.date));

    } catch (error) {
        console.error('Error updating meal dates:', error);
    } finally {
        if (connection) await connection.end();
    }
}

updateMealDates();
