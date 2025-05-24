import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Etiqueta } from "../entities/Etiqueta";

const repo = () => AppDataSource.getRepository(Etiqueta);

export async function getAllEtiquetas(req: Request, res: Response, next: NextFunction) {
  try {
    const all = await repo().find();
    res.json(all);
  } catch (err) { next(err); }
}