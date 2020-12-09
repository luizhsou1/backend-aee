import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Shift } from '../../shared/enums/shift.enum';
import { Student } from '../students/student.entity';
import { User } from './user.entity';

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: Shift,
    array: true,
  })
  shiftsAee: Shift[];

  @Column({ default: false })
  supportTeacher: boolean;

  @Column({ length: 100 })
  occupationArea: string;

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany((type) => Student, (student) => student.supportTeacher)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
