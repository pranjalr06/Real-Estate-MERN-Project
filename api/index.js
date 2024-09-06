import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from  './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
dotenv.config();
const app = express();

app.use(express.json());    

// mongoose
//     .connect(process.env.MONGO)
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

mongoose.connect("mongodb://localhost:27017/mern-real-estate").then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });

app.use('/api/user',userRouter);    // /api/user - will be the constant start url for user
app.use('/api/auth',authRouter); 


app.listen(3000, () => {
    console.log("Server is running on port 3000")
});
