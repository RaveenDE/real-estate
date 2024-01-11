import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://@cluster0.hy2vc2c.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to MONGODB!');
}).catch((err) =>{
    console.log(err);
})

const app = express();
app.listen(3000, () => {
console.log('Server is running on port 3000!!!');
}
);
