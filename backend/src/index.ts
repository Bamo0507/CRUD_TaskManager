import 'reflect-metadata';
import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';

import { AppDataSource } from './data-source';

import actividadRoutes from './routes/actividad.routes';
import proyectoRoutes from './routes/proyecto.routes';
import prioridadRoutes from './routes/prioridad.routes';
import etiquetaRoutes from './routes/etiqueta.routes';

dotenv.config();
AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: '*'
  }))

  app.use('/api/proyectos', proyectoRoutes);
  app.use('/api/actividades', actividadRoutes);
  app.use('/api/prioridades', prioridadRoutes);
  app.use('/api/etiquetas', etiquetaRoutes);
  app.listen(process.env.PORT, () =>
    console.log(`Escuhando en http://localhost:${process.env.PORT}`)
  );
});