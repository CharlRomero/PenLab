import express from "express";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import vpnRoutes from "./routes/vpn.routes.js";
import { HOST_FRONT } from "./config.js";

const app = express();
app.set("view engine", "ejs");

app.use(cors({ origin: "http://192.168.100.100:4000", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRoutes);
app.use(authRoutes);
app.use(vpnRoutes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running in port ${PORT}`)
);
