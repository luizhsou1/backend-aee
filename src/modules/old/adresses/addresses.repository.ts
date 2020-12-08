import { createQueryPaginationTypeorm } from 'src/shared/utils/query-pagination-typeorm';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Address } from './address.entity';
import { FindAddressesQueryDto } from './dtos/find-addresses-query.dto';

@EntityRepository(Address)
export class AddressesRepo extends Repository<Address> {
  async findAdresses(
    queryDto: FindAddressesQueryDto,
  ): Promise<{ addresses: Address[]; total: number }> {
    const { search, description, cep, city, neighborhood, street } = queryDto;
    const query = createQueryPaginationTypeorm(Address, 'a', queryDto) as SelectQueryBuilder<Address>;

    query.where('1 = 1');

    if (search) {
      query.andWhere('(a.description ILIKE :description OR a.cep ILIKE :cep OR a.city ILIKE :city OR a.neighborhood ILIKE :neighborhood OR a.street ILIKE :street)', {
        description: `%${search}%`,
        cep: `%${search}%`,
        city: `%${search}%`,
        neighborhood: `%${search}%`,
        street: `%${search}%`,
      });
    } else {
      if (description) {
        query.andWhere('a.description ILIKE :description', { description: `%${description}%` });
      }

      if (cep) {
        query.andWhere('a.cep ILIKE :cep', { cep: `%${cep}%` });
      }

      if (city) {
        query.andWhere('a.city ILIKE :city', { city: `%${city}%` });
      }

      if (neighborhood) {
        query.andWhere('a.neighborhood ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
      }

      if (street) {
        query.andWhere('a.street ILIKE :street', { street: `%${street}%` });
      }
    }
    const [addresses, total] = await query.getManyAndCount();

    return { addresses, total };
  }
}
