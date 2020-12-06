import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from '../schools/school.entity';
import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @ManyToOne((type) => School, (school) => school.phones)
  school: School;

  @ManyToOne((type) => Teacher, (teacher) => teacher.phones)
  teacher: Teacher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
