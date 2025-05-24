import { Router } from "express";
import { getAllPrioridades } from "../controllers/prioridad.controller";

const router = Router();
router.get("/", getAllPrioridades);

export default router;