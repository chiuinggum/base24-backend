import jwt from 'jsonwebtoken';

export const contentType = async (req, res, next) => {
    const contentType = req.get('Content-Type');
    if (!contentType || contentType !== 'application/json') {
        return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
    console.log('Content-Type header checked');
    next();
};

export const authorization = async (req, res, next) => {
    const authorization = req.get('Authorization');
    console.log(authorization);
    if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Authorization header checked');
    next();
};
export const authorizationVerifyToken = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('token verified');
        next();
    } catch(err) {
        console.error(err);
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        if(err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Error verifying token' });
    }
};
export const authorizationRole = async (req, res, next) => {
    const { role } = req.user;
    if(role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    console.log('authorization role checked');
    next();
}