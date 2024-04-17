import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import vpnRoutes from "./routes/vpn.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
app.use(vpnRoutes);

app.listen(PORT);
console.log(`Server running in port ${PORT}`);
