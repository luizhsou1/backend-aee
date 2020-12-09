import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { differenceInYears } from 'date-fns';

import { Shift } from '../../shared/enums/shift.enum';
import { Deficiency } from '../deficiencies/deficiency.entity';
import { Teacher } from '../users/teacher.entity';
import { ExtraAeeActivity } from './extra-aee-activity.enum';
import { Address } from '../../shared/entities/address.entity';
import { Phone } from '../../shared/entities/phone.entity';
import { kinship } from './kinship.enum';
import { Student } from './student.entity';

@Entity()
export class Responsible extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'enum', enum: Shift })
  kinship: kinship;

  @ManyToOne((type) => Student, (student) => student.responsibles, { onDelete: 'CASCADE' })
  student: Student;

  @OneToMany((type) => Phone, (phone) => phone.responsible, { cascade: true, eager: true })
  phones: Phone[];

  @Column({ type: 'date' })
  birthDate: string;

  age: number;

  @ManyToMany(() => Deficiency)
  @JoinTable()
  deficiencies: Deficiency[];

  @Column({ type: 'enum', enum: Shift })
  regularShift: Shift;

  aeeShift: Shift;

  @Column({ type: 'int' })
  regularClassYear: number;

  @Column({ length: 10 })
  regularClass: string;

  @Column({ type: 'int' })
  regularClassNumber: number;

  @Column({ length: 10 })
  aeeClass: string;

  @ManyToMany(() => Teacher)
  @JoinTable()
  teachers: Teacher[]

  @ManyToOne((type) => Teacher, (teacher) => teacher.supportTeacher, { eager: true, cascade: true })
  supportTeacher: Teacher;

  @Column({ type: 'enum', enum: ExtraAeeActivity, array: true })
  extraAeeActivity: ExtraAeeActivity[];

  @OneToOne(() => Address, (address) => address.student, { eager: true, cascade: true })
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  private afterLoad() {
    this.aeeShift = this.regularShift === Shift.AFTERNOON
      ? Shift.AFTERNOON
      : Shift.MORNING;
    this.age = differenceInYears(new Date(), new Date(this.birthDate));
  }
}
