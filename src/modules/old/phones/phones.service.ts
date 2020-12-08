import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { School } from '../../schools/school.entity';
import { CreatePhoneDto } from './dtos/create-phone.dto';
import { FindPhonesQueryDto } from './dtos/find-phone-query.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { Phone } from './phone.entity';
import { PhonesRepo } from './phones.repository';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(PhonesRepo)
    private readonly phonesRepo: PhonesRepo,
  ) { }

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const phone = new Phone();

    phone.description = createPhoneDto.description;
    phone.phoneNumber = createPhoneDto.phoneNumber;

    phone.school = new School();
    phone.school.id = createPhoneDto.school.id;

    return await this.phonesRepo.save(phone);
  }

  async findPhoneById(phoneId: string): Promise<Phone> {
    const phone = await this.phonesRepo.findOne(phoneId);

    if (!phone) throw new NotFoundException('Telefone não encontrado');

    return phone;
  }

  async updatePhone(updatePhoneDto: UpdatePhoneDto, id: string): Promise<Phone> {
    try {
      await this.phonesRepo.update(id, updatePhoneDto);
      return await this.findPhoneById(id);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar telefone');
    }
  }

  async deletePhone(phoneId: string) {
    const result = await this.phonesRepo.delete({ id: phoneId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um telefone com o ID informado',
      );
    }
  }

  async findPhones(
    queryDto: FindPhonesQueryDto,
  ): Promise<{ phones: Phone[]; total: number }> {
    const phones = await this.phonesRepo.findPhones(queryDto);
    return phones;
  }
}
