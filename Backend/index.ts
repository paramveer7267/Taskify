import express from "express";
const app = express();
import mongoose  from 'mongoose';
import authRoutes  from "./routes/auth";
import todoRoutes from "./routes/todo";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);
const database : string | undefined = process.env.DB_URL;
if(typeof database == 'undefined') {
    throw new Error('DB_URL environment is undefined');
}
mongoose.connect(database , 
    {
        dbName: 'Todos',
    }
)
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error: ', error);
});

app.listen(3004, () => {
    console.log("Backend running successfully",3004);
});