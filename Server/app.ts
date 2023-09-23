
import { Request, Response } from "express";
import { Application } from "express";
import express, { json } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import GlobalRouter from "./Routes/index.route";


dotenv.config({ path: path.resolve(__dirname, "../.env") });

// app
const app: Application = express();

// middleware
app.use(morgan('combined')); // Use Morgan for logging
app.use(json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api/v1', GlobalRouter)
app.use((req: any, res: any) => {
    res.status(404).json({ message: 'Request is not here' });
});



//port
const port = process.env.PORT || 8090;

//db

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error: any) {
        console.log({ message: "Cannot connect to Database"},`Error: ${error.message}`)
    }
}

//listener
app.listen(port, () => { 
    console.log(`Server Is Running on Port ${port}`) 
});
connectDB();




