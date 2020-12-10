import { UnprocessableEntityException } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../../modules/schools/school.entity';
import { Student } from '../../modules/students/student.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true, comment: 'Descricao do endereco, ex: Residencial, Comercial' })
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

  @OneToOne((type) => Student, (student) => student.address, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: Student;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  static validateAddress(address: Address) {
    const { cep, uf, addressNumber } = address;
    if ((cep) && ((!isNumberString(cep)) || (cep.length !== 8))) {
      throw new UnprocessableEntityException('Informe um CEP contendo exatamente 8 números');
    }

    if ((uf) && (![
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].includes(uf))
    ) {
      throw new UnprocessableEntityException('Informe uma UF válida');
    }

    if ((addressNumber)
      && (addressNumber < 1 && addressNumber > 9999)
    ) {
      throw new UnprocessableEntityException('Informe um número de casa com no máximo 4 dígitos');
    }
  }
}
