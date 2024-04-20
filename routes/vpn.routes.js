import { Router } from "express";
import { createVpn, download_vpn } from "../controllers/vpn.controllers.js";

const router = Router();

router.get("/vpn/:username", download_vpn);
router.post("/vpn", createVpn);

export default router;
