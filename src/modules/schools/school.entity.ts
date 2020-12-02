import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from '../adresses/address.entity';
import { Phone } from '../phones/phone.entity';

@Entity()
export class School extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true, comment: 'Possui AEE' })
  hasAee: boolean;

  @OneToMany((type) => Address, (address) => address.school, { cascade: true, eager: true })
  addresses: Address[];

  @OneToMany((type) => Phone, (phone) => phone.school, { cascade: true, eager: true })
  phones: Phone[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
