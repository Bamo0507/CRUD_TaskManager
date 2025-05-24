import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Prioridad } from "../entities/Prioridad";

const repo = () => AppDataSource.getRepository(Prioridad);

export async function getAllPrioridades(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const all = await repo().find();
    res.json(all);
  } catch (err) {
    next(err);
  }
}