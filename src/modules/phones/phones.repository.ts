import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FindPhonesQueryDto } from './dtos/find-phone-query.dto';
import { Phone } from './phone.entity';
@EntityRepository(Phone)
export class PhonesRepo extends Repository<Phone> {
  async findPhones(
    queryDto: FindPhonesQueryDto,
  ): Promise<{ phones: Phone[]; total: number }> {
    const { description, phoneNumber } = queryDto;
    const query = createQueryPaginationTypeorm(Phone, 'p', queryDto) as SelectQueryBuilder<Phone>;

    query.where('1 = 1');

    if (description) {
      query.andWhere('s.description ILIKE :description', { description: `%${description}%` });
    }

    if (phoneNumber) {
      query.andWhere('s.phoneNumber ILIKE :phoneNumber', { phoneNumber: `%${phoneNumber}%` });
    }

    const [phones, total] = await query.getManyAndCount();

    return { phones, total };
  }
}
