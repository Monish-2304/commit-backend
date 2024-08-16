import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token =
        req.cookies.jwtToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: 'Access Denied: Invalid Token' });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;
