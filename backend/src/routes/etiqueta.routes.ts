import { Router } from "express";
import { getAllEtiquetas } from "../controllers/etiqueta.controller";

const router = Router();
router.get("/", getAllEtiquetas);

export default router;