import dotenv from "dotenv"
import cors from 'cors'

import express from "express";
import connectDb from "./Connections/dbconnections.js"

dotenv.config()

const port = process.env.PORT || 4000
const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello");
})

connectDb();
app.listen(port, () => {
    console.log(port);
});