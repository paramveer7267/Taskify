"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const index_1 = require("../middleware/index");
const index_2 = require("../db/index");
const router = express_1.default.Router();
const pass = index_1.SECRET;
const signupInput = zod_1.z.object({
    username: zod_1.z.string()
        .min(4, 'Username must be of 4 letters')
        .max(20, 'Username can be of 20 letters only')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username must consist of letters, numbers, or underscores'),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, 'Password must be of 8 letters')
        .max(30, 'Password can be of 30 letters only')
        .regex(/[0-9]/, 'Password must contain at least one number')
});
const loginInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, 'Password must be of 8 letters')
        .max(30, 'Password can be of 30 letters only')
        .regex(/[0-9]/, 'Password must contain at least one number')
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json(parsedInput.error.issues[0].message);
        return;
    }
    const username = parsedInput.data.username;
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = yield index_2.User.findOne({ email });
    if (user)
        res.status(403).json('User already exists');
    else {
        const newUser = new index_2.User({ username, email, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, pass, { expiresIn: '1h' });
        res.json({ message: 'User creates successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = loginInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json(parsedInput.error.issues[0].message);
        return;
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = yield index_2.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, pass, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
        return;
    }
    res.status(403).json('Invalid Username or password');
}));
router.get('/me', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield index_2.User.findOne({ _id: userId });
    if (user)
        res.json({ username: user.username });
    else
        res.status(403).json({ message: "User not logged in" });
}));
exports.default = router;
