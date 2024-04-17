import { Router } from "express";
import { authentication } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth", authentication);

export default router;
