import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or token malfunctioned" });
        }
        // get user chats
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send all the chats with a new one to the openai api
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: chats });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
        // get the response
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User Not Registered or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions Did Not Matched");
        }
        return res.status(200).json({ message: "Ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map