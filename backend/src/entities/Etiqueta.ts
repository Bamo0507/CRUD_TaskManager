import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Actividad } from './Actividad';

@Entity()
export class Etiqueta {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ length: 30, unique: true }) nombre!: string;
  @ManyToMany(() => Actividad, a => a.etiquetas) actividades!: Actividad[];
}