import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app = express();
// middlewares - functions that get executed before request is processed, its a bridge between req and res to modify req and res. In node and express, middlewares are used to check
// JSON body validations, tockets or cookies validations, etc.
app.use(express.json());
// remove once in production
app.use(morgan("dev"));
//  after we make request on /api/v1 it will be sent to appRouter
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map