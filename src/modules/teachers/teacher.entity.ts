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

  @Column({ length: 100 })
  email: string;

  @OneToOne(() => School, { eager: true })
  @JoinColumn()
  school: School;

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

  @OneToMany((type) => Phone, (phone) => phone.school, { cascade: true, eager: true })
  phones: Phone[];

  @OneToOne(() => User, (user) => user.teacher, { cascade: true, eager: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
