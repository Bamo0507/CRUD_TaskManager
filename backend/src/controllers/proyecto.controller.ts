import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Proyecto }     from '../entities/Proyecto';

const repo = () => AppDataSource.getRepository(Proyecto);

export async function getAllProyectos(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await repo().find();
    return res.json(list);
  } catch (err) {
    return next(err);
  }
}

export async function createProyecto(req: Request, res: Response, next: NextFunction) {
  try {
    const nueva = repo().create(req.body);
    const saved = await repo().save(nueva);
    return res.status(201).json(saved);
  } catch (err) {
    return next(err);
  }
}

export async function deleteProyecto(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const result = await repo().delete(id);
    if (result.affected === 0) return res.status(404).json({ message: 'No existe' });
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}