
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
// import GlobalRouter from "./Routes/index.route";
// import UserRouter from "./Routes/User/user.route";
dotenv.config();

// app
const app: express.Application = express();

// middleware
app.use(morgan('combined')); // Use Morgan for logging
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// app.use('/api/v1', GlobalRouter)
// app.use('/api/v1/users', UserRouter)
app.use((req: any, res: any) => {
    res.status(404).json({ message: 'You arrived at Healthish, But with the wrong request!😒' });
});

//

//port
const port = process.env.PORT || 8090;
console.log(process.env.MONGO_URI as string);

//db

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions)
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




