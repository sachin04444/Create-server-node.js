import express from "express";
import { config } from "dotenv";


config({
    path:"./config/config.env"
})

const app=express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true, 
  })
);

import user from "./routes/userRoutes.js"

app.use("/api/v1",user)


export default app