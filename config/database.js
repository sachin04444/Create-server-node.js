import mongoose from "mongoose";

export const connectDB =async ()=>{
    const {connection } =await mongoose.connect(process.env.DATABASE)
    console.log(`MongoDB connection with ${connection.host}`)
}