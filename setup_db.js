
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function setupDatabase() {
    let connection;
    try {
        console.log('Reading db_setup.sql...');
        const sql = await fs.readFile(path.join(process.cwd(), 'db_setup.sql'), 'utf8');

        console.log('Connecting to MySQL server...');
        // Connect without database selected to drop/create it
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT) || 3306,
            multipleStatements: true
        });

        console.log('Connected to MySQL server. Executing SQL script...');

        // Split SQL into statements if necessary, but multipleStatements: true should handle it.
        // However, mysql2 might not return results for all if not handled carefully.
        // For simplicity with this driver, just running the whole thing.

        const [results] = await connection.query(sql);

        console.log('Database setup completed successfully.');
        console.log('Results summary:', Array.isArray(results) ? `${results.length} statements executed` : 'Script executed');

    } catch (error) {
        console.error('Database setup failed:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Connection closed.');
        }
    }
}

setupDatabase();
