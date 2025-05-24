import { Column, CreateDateColumn } from 'typeorm';

export class TiempoActividad {
  @CreateDateColumn({ name: 'tiempos_createdat', type: 'timestamp' })
  createdAt!: Date;

  @Column({ name: 'tiempos_inprogressat', type: 'timestamp', nullable: true })
  inProgressAt?: Date;

  @Column({ name: 'tiempos_completedat',  type: 'timestamp', nullable: true })
  completedAt?: Date;
}