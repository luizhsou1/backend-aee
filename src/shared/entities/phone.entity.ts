import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { School } from '../../modules/schools/school.entity';
import { User } from '../../modules/users/user.entity';

@Entity()
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @ManyToOne((type) => School, (school) => school.phones, { onDelete: 'CASCADE' })
  school: School;

  @ManyToOne((type) => User, (user) => user.phones, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
