import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

 const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB error", error);
    }
};
export default dbconnect;
export const createJWT = (res, userId) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret not found");
        }
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1hr' });
            res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
        console.log("Token created and cookie set: ", token);
        return token;
    } catch (error) {
        console.log("Error creating JWT", error);
    }
};
