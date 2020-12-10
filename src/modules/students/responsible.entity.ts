import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne,
  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Shift } from '../../shared/enums/shift.enum';
import { Phone } from '../../shared/entities/phone.entity';
import { kinship } from './kinship.enum';
import { Student } from './student.entity';

@Entity()
export class Responsible extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'enum', enum: kinship })
  kinship: kinship;

  @ManyToOne((type) => Student, (student) => student.responsibles, { onDelete: 'CASCADE' })
  student: Student;

  @OneToMany((type) => Phone, (phone) => phone.responsible, { cascade: true, eager: true })
  phones: Phone[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
