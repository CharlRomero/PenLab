import { Router } from "express";
import { createVpn } from "../controllers/vpn.controllers.js";

const router = Router();

router.post("/vpn", createVpn);

export default router;
