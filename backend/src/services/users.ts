import { User } from '../lib/types';
import db from '../db/connection';
import bcrypt from 'bcrypt';
export const login = async (email: string, password: string) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user.rows.length) return { statusCode: 404, msg: 'User is not found' }
    return bcrypt.compareSync(password, user.rows[0].password) ? {
        user: {
            id: user.rows[0].id,
            email: user.rows[0].email,
            full_name: user.rows[0].full_name
        }
    } : { statusCode: 401, msg: 'Invalid user details' }
};