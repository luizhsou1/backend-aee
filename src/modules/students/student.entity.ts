import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { differenceInYears } from 'date-fns';
import { Shift } from '../../shared/enums/shift.enum';
import { Deficiency } from '../deficiencies/deficiency.entity';
import { Teacher } from '../users/teacher.entity';
import { ExtraAeeActivity } from './extra-aee-activity.enum';
import { Address } from '../../shared/entities/address.entity';
import { Responsible } from './responsible.entity';
import { Document } from './document.entity';
import { Gender } from '../../shared/enums/gender.enum';
import { School } from '../schools/school.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30 })
  aeeRegistration: string;

  @Column({ length: 30 })
  regularRegistration: string;

  @Column({ type: 'date' })
  birthDate: string;

  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

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
  regularClassRoom: number;

  @Column({ length: 10 })
  aeeClass: string;

  @Column({ length: 300, nullable: true })
  urlImage: string;

  @ManyToMany(() => Teacher)
  @JoinTable()
  teachers: Teacher[];

  @ManyToOne((type) => Teacher, (teacher) => teacher.supportTeacher, { eager: true })
  supportTeacher: Teacher;

  @OneToMany((type) => Responsible, (responsible) => responsible.student, {
    eager: true,
    cascade: true,
  })
  responsibles: Responsible[];

  @OneToMany((type) => Document, (document) => document.student, {
    eager: true,
    cascade: true,
  })
  documents: Document[];

  @Column({ type: 'enum', enum: ExtraAeeActivity, array: true })
  extraAeeActivity: ExtraAeeActivity[];

  @OneToOne(() => Address, (address) => address.student, { eager: true, cascade: true })
  address: Address;

  @ManyToOne((type) => School, (school) => school.user, { eager: true })
  sourceSchool: School;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  private afterLoad() {
    this.aeeShift = this.regularShift === Shift.MORNING
      ? Shift.AFTERNOON
      : Shift.MORNING;
    this.age = differenceInYears(new Date(), new Date(this.birthDate));
  }
}
