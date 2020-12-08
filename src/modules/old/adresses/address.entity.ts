import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../../schools/school.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, comment: 'Descricao do endereco, ex: Residencial, Comercial' })
  description: string;

  @Column({ length: 10 })
  cep: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  uf: string;

  @Column({ length: 100 })
  neighborhood: string;

  @Column({ length: 100 })
  street: string;

  @Column({ type: 'int' })
  addressNumber: number;

  @Column({ length: 100 })
  complement: string;

  @OneToOne((type) => School, (school) => school.address, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: School;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
