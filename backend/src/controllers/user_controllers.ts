import { NextFunction, Request, Response} from "express";
import User from "../models/user.js";

export const getAllUsers = async (req: Request, res: Response, next:NextFunction) => {
    try {
        // find all users so dont input param
        const users = await User.find();
        return res.status(200).json({message: "Ok", users})
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause:error.message })
    }

}