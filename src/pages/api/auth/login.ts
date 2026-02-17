
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

        // Ensure table exists (Lazy init pattern for prototype speed)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                email VARCHAR(255) UNIQUE NOT NULL, 
                password VARCHAR(255) NOT NULL, 
                name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Find user
        const [rows]: any[] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), { status: 401 });
        }

        const user = rows[0];
        const isValid = await Auth.verifyPassword(password, user.password);

        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), { status: 401 });
        }

        const sessionToken = Auth.createSessionToken(user.id);

        // Calculate expiration (e.g., 7 days)
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        return new Response(JSON.stringify({ message: 'Login exitoso', user: { name: user.name, email: user.email } }), {
            status: 200,
            headers: {
                'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires.toUTCString()}`,
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
    }
};
