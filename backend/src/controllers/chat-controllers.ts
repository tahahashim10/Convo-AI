import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAi } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { userSignup } from "./user_controllers.js";
import { log } from "console";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).json({message: "User not registered or token malfunctioned"});
        }
        // get user chats
        const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"});

        
        // send all the chats with a new one to the openai api
        const config = configureOpenAi();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chats});
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});
        // get the response
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
        
    }
    

};