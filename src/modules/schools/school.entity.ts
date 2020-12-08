import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Address } from '../adresses/address.entity';
import { Phone } from '../phones/phone.entity';
import { User } from '../users/user.entity';

@Entity()
export class School extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true, comment: 'Possui AEE' })
  hasAee: boolean;

  @OneToOne(() => Address, (address) => address.school, { eager: true, cascade: true })
  address: Address;

  @OneToMany((type) => Phone, (phone) => phone.school, { eager: true, cascade: true })
  phones: Phone[];

  @OneToMany((type) => User, (user) => user.sourceSchool)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
