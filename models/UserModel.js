import dbConfig from '../config/dbConfig.js';
const { db } = dbConfig;

export const createUser = async (username, email, password, provider = "native") => {
    try {
        const [userRow] = await db.query('INSERT INTO users (provider, username, email, password) VALUES (?, ?, ?, ?)', [provider, username, email, password]);
        console.log(`user ${username} created with id ${userRow.insertId}`);
        return userRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const [userRow] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return userRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const [userRow] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return userRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};
