import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

mongoose.connect("mongodb+srv://raveen:1234@cluster0.hy2vc2c.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to MONGODB!');
}).catch((err) =>{
    console.log(err);
})


const app = express();

app.use(express.json());

app.listen(3000, () => {
console.log('Server is running on port 3000!!!');
}
);

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});