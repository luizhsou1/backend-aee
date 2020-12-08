import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-roles.enum';
import { School } from '../schools/school.entity';
import { Phone } from '../../shared/entities/phone.entity';
import { Teacher } from './teacher.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ default: true })
  active: boolean;

  @Column({ length: 100, select: false })
  password: string;

  @Column({ length: 100, select: false })
  salt: string;

  @Column({ nullable: true, length: 64 })
  recoverToken: string;

  @OneToMany((type) => Phone, (phone) => phone.user, { cascade: true, eager: true })
  phones: Phone[];

  @ManyToOne((type) => School, (school) => school.user, { eager: true })
  sourceSchool: School;

  @OneToOne((type) => Teacher, (teacher) => teacher.user, { cascade: true, eager: true })
  teacher: Teacher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
