import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user_controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, userLogin);
export default userRoutes;
// after the starter user authentication (providing user and password) the user will be provided a token to access resources
// to send and access chats, the user needs to send the same token, use JSON Web Token (JWT): used to encrypt a payload into a signed token that has permissions of the user
// HTTP only cookies are a type of web cookies with security attribute that restricts cookies from being accessed by JavaScript (prevent XSS attacks)
//# sourceMappingURL=user_routes.js.map