import jwt from 'jsonwebtoken';

const generateToken = (res, userId, email) => {
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
    });
    res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: 'None',
    });
    return token;
};

export default generateToken;
