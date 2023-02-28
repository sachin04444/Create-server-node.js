import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"
import {sendToken} from "../utils/sendToken.js"
import crypto from "crypto";

export const register = catchAsyncError(async(req,res,next) =>{
  const {name,email,password} = req.body;
  
  if(!name || !email || !password)
     return next(new ErrorHandler("please enter all field" , 400))
  
  let user =await User.findOne({ email });

  if(user) return next(new ErrorHandler("User Already Exist"),409)

  user = await User.create({
    name,email,password
  })

  res.status(200).json({
    success: true,
  
  });

})

export const login =catchAsyncError(async(req,res,next)=>{

  const {email , password} =req.body

  if(!email,!password)
     return next(new ErrorHandler("please Enter All field",400))
  
  const user=await User.findOne({email}).select("+password")

  if(!user) return next(new ErrorHandler("Incorrect Email or password" , 401))

  const isMatch =await user.comparePassword(password)

  if(!isMatch)
    return next(new ErrorHandler("Incorrect Email and password",401)) 
  
  sendToken(res, user , `walcome back,${user.name}`,200)
})