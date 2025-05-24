import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Actividad } from "../entities/Actividad";
import { VwActividad } from "../entities/VwActvidad";
import { Estado } from "../entities/Estado";

const repo = () => AppDataSource.getRepository(Actividad);

export async function getAllActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(VwActividad);
      const actividades = await repo.find();
      res.json(actividades);
    } catch (err) {
      next(err);
    }
}

export async function getActivityById(req: Request, res: Response, next: NextFunction) {
    try {
        const actividad = await repo().findOne({ where: { id: Number(req.params.id) }, relations: ['proyecto', 'prioridad', 'etiquetas'] });
        if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });
        res.json(actividad);
    } catch (err) {
        next(err);
    }
}

export async function createActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const actividad = await repo().save(req.body);
        res.status(201).json(actividad);
    } catch (err) {
        next(err);
    }
}

export async function updateActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const actividad = await repo().findOne({ 
        where: { id: Number(req.params.id) },
        relations: []
      });
      if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });
  
      const nextEstado = req.body.estado as Estado;
      actividad.estado = nextEstado;
  
      if (nextEstado === Estado.PROGRESO) {
        actividad.tiempos.inProgressAt = new Date();
      } else if (nextEstado === Estado.COMPLETADO) {
        actividad.tiempos.completedAt = new Date();
      }
  
      if (req.body.nombre != null) actividad.nombre = req.body.nombre;
      if (req.body.dificultad != null) actividad.dificultad = req.body.dificultad;
  
      const saved = await repo().save(actividad);
  
      res.json(saved);
    } catch (err) {
      next(err);
    }
}

export async function deleteActivity(req: Request, res: Response, next: NextFunction) {
    try {
        const actividad = await repo().findOne({ where: { id: Number(req.params.id) } });
        if (!actividad) return res.status(404).json({ message: "Actividad no encontrada" });
        await repo().delete(actividad.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}
