import os from 'os';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Actividad }     from './entities/Actividad';
import { Proyecto }      from './entities/Proyecto';
import { Prioridad }     from './entities/Prioridad';
import { Etiqueta }      from './entities/Etiqueta';
import { TiempoActividad } from './entities/TiempoActividad';
import { VwActividad }   from './entities/VwActvidad';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || os.userInfo().username,
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME || 'TaskManager',
  synchronize: true,
  logging: false,
  entities: [
    Actividad,
    Proyecto,
    Prioridad,
    Etiqueta,
    TiempoActividad,
    VwActividad,
  ],
});