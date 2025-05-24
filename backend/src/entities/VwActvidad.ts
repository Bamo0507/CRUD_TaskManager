import { ViewEntity, DataSource, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'vw_actividades',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('a.nombre', 'nombre_actividad')
      .addSelect('a.estado', 'estado')
      .addSelect('p.nivel', 'prioridad')
      .addSelect('pr.nombre', 'proyecto')
      .addSelect('a.dificultad', 'dificultad')
      .addSelect('a.tiempos_createdat', 'tiemposCreatedat')
      .addSelect('a.tiempos_inprogressat', 'tiemposInprogressat')
      .addSelect('a.tiempos_completedat', 'tiemposCompletedat')
      .addSelect('COALESCE(array_agg(e.nombre ORDER BY e.nombre), ARRAY[]::text[])', 'etiquetas')
      .from('actividad', 'a')
      .leftJoin('prioridad', 'p', 'p.id = a."prioridadId"')
      .leftJoin('proyecto', 'pr', 'pr.id = a."proyectoId"')
      .leftJoin('actividad_etiquetas', 'ae', 'ae."actividadId" = a.id')
      .leftJoin('etiqueta', 'e', 'e.id = ae."etiquetaId"')
      .groupBy('a.id')
      .addGroupBy('p.nivel')
      .addGroupBy('pr.nombre'),
})

export class VwActividad {
  @ViewColumn() id!: number;
  @ViewColumn() nombre_actividad!: string;
  @ViewColumn() estado!: string;
  @ViewColumn() prioridad!: string;
  @ViewColumn() proyecto!: string;
  @ViewColumn() dificultad!: number;
  @ViewColumn() tiemposCreatedat!: Date;
  @ViewColumn() tiemposInprogressat!: Date | null;
  @ViewColumn() tiemposCompletedat!: Date | null;
  @ViewColumn() etiquetas!: string[];
}