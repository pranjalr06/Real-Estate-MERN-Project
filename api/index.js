import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from  './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());  

app.use(cookieParser());

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


app.use((err, req, res, next) => {          //middlewear => err - which is comming from middleware|req - data from browser/client|res- response from server to client|next - to go to next middleware    
    const statusCode = err.statusCode || 500;   //statuscode- from the input of middleware
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });    
});    


app.use('/api/user',userRouter);    // /api/user - will be the constant start url for user
app.use('/api/auth',authRouter); 


app.listen(3000, () => {
    console.log("Server is running on port 3000")
});
