import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request , Response , NextFunction} from 'express';


dotenv.config();

export const SECRET = process.env.SECRET!;

export const authenticateJwt = (req : Request,res : Response , next : NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token , SECRET , (err,payload) => {
            if(err || !payload) return res.sendStatus(403);
            if(typeof payload === "string") return res.sendStatus(403);
            req.headers["userId"] = payload.id;
            next();
        });
    }
    else res.sendStatus(401);
};

module.exports = {
    authenticateJwt,
    SECRET
};