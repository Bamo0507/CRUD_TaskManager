import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from './Actividad';

@Entity()
export class Prioridad {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ length: 30, unique: true }) nivel!: string;
  @OneToMany(() => Actividad, a => a.prioridad) actividades!: Actividad[];
}