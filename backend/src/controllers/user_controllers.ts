import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // find all users so dont input param
        const users = await User.find();
        return res.status(200).json({message: "Ok", users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause:error.message });
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // create the user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(401).send("User Already Registered");
        const hashedPassword =  await hash(password, 10);
        const user = new User({ name, email, password:hashedPassword });
        await user.save();

        // once the user signs up we want to remove prev cookies and set the current cookie
        res.clearCookie(COOKIE_NAME, { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true});

        return res.status(201).json({message: "Ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message });
    }
}       

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // user login
        const { email, password } = req.body;
        // find the email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).send("User Not Registered");
        }
        // password validation
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        // once the user logins we want to remove prev cookies and set the current cookie
        res.clearCookie(COOKIE_NAME, { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true});

        return res.status(200).json({message: "Ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause:error.message });
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User Not Registered or Token Malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions Did Not Matched");
        }



        return res.status(200).json({message: "Ok", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause:error.message });
    }
}