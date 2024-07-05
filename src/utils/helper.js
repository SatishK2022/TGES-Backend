import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export const generateToken = (payload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRY }
    );
};

export function isValuePresent(obj) {
    return Object.values(obj).every(value => value !== undefined && value !== null && value !== "");
}

export const generateOTP = (length) => {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return parseInt(otp);
}
