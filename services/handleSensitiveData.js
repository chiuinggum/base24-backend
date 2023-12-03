import bcrypt from 'bcrypt';

export const checkRegex = async (req, res, next) => {
    const { email, password } = req.body;

    const passwordRegex = [/[A-Z]/, /[a-z]/, /[0-9]/, /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/|]/];
    const typesCount = passwordRegex.filter(regex => regex.test(password)).length;
    if (typesCount < 3) {
        return res.status(400).json({ error: 'Password not strong enough.' });
    }
    console.log('Password regex checked');

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email not in the right form.' });
    }
    console.log('Email regex checked');

    next();
};
export const confirmPassword = async (req, res, next) => {
    const { password, conf_password } = req.body;
    if (password !== conf_password) {
        return res.status(400).json({ error: 'Password Does Not Match.' });
    }
    console.log('Password confirmed');
    next();
}
export const hashPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        console.log('Password hashed');
        next();
    } catch(err) {
        return res.status(500).json({ error: 'Error hashing password' });
    }
};
export const verifyToken = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Token verified');
        next();
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Error verifying token' });
    }
};

// class handleSensitiveData {
//     static async checkRegex(req, res, next) {
//         const { email, password } = req.body;

//         const passwordRegex = [/[A-Z]/, /[a-z]/, /[0-9]/, /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/|]/];
//         const typesCount = passwordRegex.filter(regex => regex.test(password)).length;
//         if (typesCount < 3) {
//             return res.status(400).json({ error: 'Password not strong enough.' });
//         }
//         console.log('Password regex checked');
    
//         const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ error: 'Email not in the right form.' });
//         }
//         console.log('Email regex checked');

//         next();
//     };
//     static async confirmPassword(req, res, next) {
//         const { password, conf_password } = req.body;
//         if (password !== conf_password) {
//             return res.status(400).json({ error: 'Password Does Not Match.' });
//         }
//         console.log('Password confirmed');
//         next();
//     }
//     static async hashPassword(req, res, next) {
//         const { password } = req.body;
//         try {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             req.body.password = hashedPassword;
//             console.log('Password hashed');
//             next();
//         } catch(err) {
//             return res.status(500).json({ error: 'Error hashing password' });
//         }
//     };
//     static async verifyToken(req, res, next) {
//         const token = req.get('Authorization').split(' ')[1];
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = decoded;
//             console.log('Token verified');
//             next();
//         } catch(err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error verifying token' });
//         }
//     };
// };

// module.exports = handleSensitiveData;