
import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { Auth } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email y contraseña requeridos' }), { status: 400 });
        }

        // Ensure table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                email VARCHAR(255) UNIQUE NOT NULL, 
                password VARCHAR(255) NOT NULL, 
                name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check availability
        const [existing]: any[] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 409 });
        }

        // Create user
        const hashedPassword = await Auth.hashPassword(password);
        const [result]: any = await pool.query(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, email.split('@')[0]] // Default name from email
        );

        const userId = result.insertId;
        const sessionToken = Auth.createSessionToken(userId);

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        return new Response(JSON.stringify({ message: 'Usuario creado', user: { email } }), {
            status: 201,
            headers: {
                'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires.toUTCString()}`,
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        return new Response(JSON.stringify({ error: 'Error al registrar usuario' }), { status: 500 });
    }
};
