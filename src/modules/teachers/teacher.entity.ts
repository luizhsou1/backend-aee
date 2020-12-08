import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Phone } from '../phones/phone.entity';
import { School } from '../schools/school.entity';
import { User } from '../users/user.entity';
import { TeacherShiftAee } from './teacher-shift-aee.enum';

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: TeacherShiftAee,
    array: true,
  })
  shiftsAee: TeacherShiftAee[];

  @Column({ default: false })
  supportTeacher: boolean;

  @Column({ length: 100 })
  occupationArea: string;

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
