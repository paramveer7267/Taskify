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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const index_1 = require("../middleware/index");
const index_2 = require("../db/index");
const router = express_1.default.Router();
const TodoSchema = zod_1.z.object({
    title: zod_1.z.string()
        .min(1, 'Title cannot be Empty')
        .max(100, 'Title can only be of 100 words'),
    description: zod_1.z.string()
        .min(1, 'Description cannot be Empty')
        .max(500, 'Description can only be of 500 words')
});
router.post('/todos', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTodo = TodoSchema.safeParse(req.body);
    if (!validateTodo.success) {
        res.status(411).json(validateTodo.error.issues[0].message);
        return;
    }
    const title = validateTodo.data.title;
    const description = validateTodo.data.description;
    try {
        const done = false;
        const userId = req.headers["userId"];
        const newTodo = new index_2.Todo({ title, description, done, userId });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (err) {
        res.status(500).json('Failed to create a new todo');
    }
}));
router.get('/todos', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"];
        const todos = yield index_2.Todo.find({ userId });
        res.json(todos);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
}));
router.put('/todos/:id', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTodo = TodoSchema.safeParse(req.body);
    if (!validateTodo.success) {
        res.status(411).json(validateTodo.error.issues[0].message);
        return;
    }
    const title = validateTodo.data.title;
    const description = validateTodo.data.description;
    const todoId = req.params.id;
    try {
        const updatedTodo = yield index_2.Todo.findByIdAndUpdate(todoId, { title, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
}));
router.delete('/todos/:id', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    try {
        const deletedTodo = yield index_2.Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}));
router.patch('/todos/:todoId/done', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const userId = req.headers["userId"];
        const todo = yield index_2.Todo.findOne({ _id: todoId, userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.done = !todo.done;
        const updatedTodo = yield todo.save();
        res.json(updatedTodo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
}));
exports.default = router;
