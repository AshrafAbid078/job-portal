import { config } from "dotenv";
config();

import express, { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import applicationRouter  from "./routes/applicationRoute.js";
import UserRouter from "./routes/userRoute.js";
import CompanyRouter from "./routes/companyRoute.js";
import JobRouter from "./routes/jobRoute.js";


const app = express();

app.use(helmet());
app.use(hpp());

app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch(console.error);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use("/api/v1/users", limiter, UserRouter);
app.use("/api/v1/companies", limiter, CompanyRouter);
app.use("/api/v1/jobs", limiter, JobRouter);
app.use("/api/v1/applications", limiter,applicationRouter);


export default app;
