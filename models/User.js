import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    // role: {
    //     type: String,
    //     enum: ["admin", "user"],
    //     default: "user",
    //   },
    
    // subscription: {
    //     id: String,
    //     status: String,
    //   },
    //   avatar: {
    //     public_id: {
    //       type: String,
    //     //   required: true,
    //     },
    //     url: {
    //       type: String,
    //     //   required: true,
    //     },
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // resetPasswordToken: String,
    // resetPasswordExpire: String,
})



schema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password =await  bcrypt.hash(this.password,10);
    next()
})

schema.method.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

schema.methods.getTWTToken =function(){
    return JsonWebTokenError.sign({ _id: this._id},process.env.SKEY,{
        expireIn:"15d"
    })

}
 
export const User = mongoose.model("user", schema)