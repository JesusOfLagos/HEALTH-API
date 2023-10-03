console.log("Starting...")
import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import GlobalRouter from "./Routes/index.route"
import UserRouter from "./Routes/User/user.route"

// dotenv.config()

export const app: Express = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use('/api/v1', GlobalRouter)
app.use('/api/v1/users', UserRouter)
app.use((req: any, res: any) => {
    res.status(404).json({ message: 'You arrived at Healthish, But with the wrong request!😒' });
}
);

const port = process.env.PORT || 8090
console.log(process.env.MONGO_URI as string)

async function connectDB(): Promise<void> {
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

app.listen(port, () => { 
    console.log(`Server Is Running on Port ${port}`) 
}

);

connectDB();


