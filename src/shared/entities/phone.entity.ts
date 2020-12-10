import { UnprocessableEntityException } from '@nestjs/common';
import { isNumberString } from 'class-validator';
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
import { Responsible } from '../../modules/students/responsible.entity';
import { User } from '../../modules/users/user.entity';

@Entity()
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ length: 20, nullable: true })
  phoneNumber: string;

  @ManyToOne((type) => School, (school) => school.phones, { onDelete: 'CASCADE' })
  school: School;

  @ManyToOne((type) => User, (user) => user.phones, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne((type) => Responsible, (responsible) => responsible.phones, { onDelete: 'CASCADE' })
  responsible: Responsible;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static validatePhoneNumber(phoneNumber: string) {
    if ((phoneNumber)
      && ((!isNumberString(phoneNumber)) || (phoneNumber.length < 10 || phoneNumber.length > 11))
    ) {
      throw new UnprocessableEntityException('Telefone deve conter de 10 a 11 números, considerando o DDD');
    }
  }
}
