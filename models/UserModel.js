import dbConfig from '../config/dbConfig.js';
const { db } = dbConfig;

class UserModel {
    static async createUser(username, email, password, provider = "native") {
        try {
            const [userRow] = await db.query('INSERT INTO users (provider, username, email, password) VALUES (?, ?, ?, ?)', [provider, username, email, password]);
            console.log(`user ${username} created with id ${userRow.insertId}`);
            return userRow;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    static async getUserByUsername(username) {
        try {
            const [userRow] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            return userRow;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    static async getUserByEmail(email) {
        try {
            const [userRow] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return userRow;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};

export default UserModel;