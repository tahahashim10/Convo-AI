import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user_controllers.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", userSignup);
export default userRoutes;
//# sourceMappingURL=user_routes.js.map