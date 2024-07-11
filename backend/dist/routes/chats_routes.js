import { Router } from "express";
import { verifyToken } from "../utils/token_manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
// protected api
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
export default chatRoutes;
//# sourceMappingURL=chats_routes.js.map