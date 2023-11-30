import jwt from 'jsonwebtoken';

import { getUserByEmail, createUser } from "../models/UserModel.js";
import { getUserByUsername } from "../models/UserModel.js";

class UserController {
    static async checkSignUpFields(req, res, next) {
        const { username, email, password, conf_password } = req.body;
        if(!username || !email || !password || !conf_password) {
            return res.status(400).json({ error: 'Missing Fields' });
        }
        next();
    }
    static async isUsernameTaken(req, res, next) {
        const { username } = req.body;
        try { 
            const user = await getUserByUsername(username);
            if (user) {
                return res.status(409).json({ error: 'Username Already Exist' });
            }
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Checking Username' });
        }
    };
    static async isEmailTaken(req, res, next) {
        const { email } = req.body;
        try {
            const user = await getUserByEmail(email);
            if (user) {
                return res.status(409).json({ error: 'Email Already Exist' });
            }
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Checking Email' });
        }
    };
    static async signUp(req, res, next) {
        const { username, email, password } = req.body;
        const provider = 'native' || req.body.provider;
        try {
            const user = await createUser(username, email, password, provider);
            const payload = { id: user.insertId, username, email, provider };
            const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({
                data: {
                    access_token,
                    access_expired: process.env.JWT_EXPIRES_IN,
                    user: payload
                }
            });
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Signing Up' });
        }
    }
};

export default UserController;