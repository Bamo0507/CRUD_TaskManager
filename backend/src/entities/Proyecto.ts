import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from './Actividad';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ length: 50 }) nombre!: string;
  @OneToMany(() => Actividad, a => a.proyecto) actividades!: Actividad[];
}