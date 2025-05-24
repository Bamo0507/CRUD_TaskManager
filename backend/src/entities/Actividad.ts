import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, ManyToMany, JoinTable, Check
  } from 'typeorm';
import { Proyecto }      from './Proyecto';
import { Prioridad }     from './Prioridad';
import { Etiqueta }      from './Etiqueta';
import { TiempoActividad }  from './TiempoActividad';
import { Estado }        from './Estado';
  
@Check('dificultad BETWEEN 1 AND 100')
@Entity()
  export class Actividad {
    @PrimaryGeneratedColumn() id!: number;
    @Column({ length: 50 }) nombre!: string;
    @ManyToOne(() => Proyecto, p => p.actividades, { nullable: false }) proyecto!: Proyecto;
    @Column({ type: 'enum', enum: Estado, default: Estado.PENDIENTE }) estado!: Estado;
    @Column(() => TiempoActividad, { prefix: '' }) tiempos!: TiempoActividad;
    @ManyToOne(() => Prioridad, p => p.actividades, { nullable: true }) prioridad!: Prioridad;
    @Column({ type: 'int', default: 1 }) dificultad!: number;
    @ManyToMany(() => Etiqueta, e => e.actividades, { cascade: true })
    @JoinTable({ name: 'actividad_etiquetas' })
    etiquetas!: Etiqueta[];
}