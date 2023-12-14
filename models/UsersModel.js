import dbConfig from '../config/dbConfig.js';
const { db } = dbConfig;

export const createUserRow = async (username, email, password) => {
    try {
        const [userRow] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        console.log(`user ${username} created with id ${userRow.insertId}`);
        return userRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getUserRowByEmail = async (email) => {
    try {
        const [userRow] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(`user ${email} found`);
        return userRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}