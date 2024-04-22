import { Router } from "express";
import {
  createVpn,
  download_vpn,
  vmDeploy,
} from "../controllers/vpn.controllers.js";

const router = Router();

router.get("/vpn/:username", download_vpn);
router.post("/vpn", createVpn);
router.post("/deploy", vmDeploy);

export default router;
