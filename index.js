import dotenv from "dotenv"
import cors from 'cors'
import express from "express";
import connectDb from "./Connections/dbconnections.js"

dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello");
})
connectDb();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port 1000`);
});