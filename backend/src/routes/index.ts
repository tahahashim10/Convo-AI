import { Router } from 'express';
import userRoutes from './user_routes.js';
import chatRoutes from './chats_routes.js';

const appRouter = Router();

// if the reqest to /user then we need to use user routes
appRouter.use("/user", userRoutes);  //domain/api/v1/user
// if the reqest to /chats then we need to use chat routes
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats


export default appRouter;