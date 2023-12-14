import {
    createUserRow,
    getUserRowByEmail
} from '../models/UsersModel.js';

export const userSignUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUserRow(username, email, password);
        res.status(200).json({
            data: {
                id: user.insertId,
                username,
                email
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating User' });
    }
}

export const userSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserRowByEmail(email);
        if (user.length === 0) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        if (user[0].password !== password) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }
        console.log(`user ${email} signed in`);
        res.status(200).json({
            data: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Signing In' });
    }
}