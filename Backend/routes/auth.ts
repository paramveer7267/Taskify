import jwt from 'jsonwebtoken';
import express from 'express';
import { z } from 'zod';
import { authenticateJwt, SECRET } from '../middleware/index';
import { User } from '../db/index';
const router = express.Router();
const pass : string = SECRET;

const signupInput = z.object({
    username: z.string()
    .min(4,'Username must be of 4 letters')
    .max(20,'Username can be of 20 letters only')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must consist of letters, numbers, or underscores'),
    email: z.string().email(),
    password: z.string()
    .min(8,'Password must be of 8 letters')
    .max(30, 'Password can be of 30 letters only')
    .regex(/[0-9]/,'Password must contain at least one number')
});

const loginInput = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8,'Password must be of 8 letters')
    .max(30, 'Password can be of 30 letters only')
    .regex(/[0-9]/,'Password must contain at least one number')
});

router.post('/signup' , async (req,res) => {
    const parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success) {
        res.status(411).json(parsedInput.error.issues[0].message);
        return;
    }
    const username = parsedInput.data.username;
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = await User.findOne({email});
    if(user) res.status(403).json('User already exists');
    else {
        const newUser = new User({username , email , password});
        await newUser.save(); 
        const token = jwt.sign({ id: newUser._id }, pass, { expiresIn: '1h' });
        res.json({message: 'User creates successfully' , token});
    }
});

router.post('/login' , async (req,res) => {
    const parsedInput = loginInput.safeParse(req.body);
    if(!parsedInput.success) {
        res.status(411).json(parsedInput.error.issues[0].message);
        return;
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = await User.findOne({email , password});
    if(user) {
        const token = jwt.sign({id: user._id }, pass, {expiresIn: '1h'});
        res.json({message: 'Logged in successfully' , token});
        return;
    }
    res.status(403).json('Invalid Username or password');
});

router.get('/me' , authenticateJwt , async (req,res) => {
    const userId = req.headers["userId"];
    const user = await User.findOne({_id : userId});
    if(user) res.json({username : user.username});
    else res.status(403).json({message: "User not logged in"});
});

export default router;