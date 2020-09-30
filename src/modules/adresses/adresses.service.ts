import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { School } from '../schools/school.entity';
import { Address } from './address.entity';
import { AddressesRepo } from './addresses.repository';
import { CreateAddressDto } from './dtos/create-address.dto';
import { FindAddressesQueryDto } from './dtos/find-addresses-query.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AdressesService {
  constructor(
    @InjectRepository(AddressesRepo)
    private readonly addressesRepo: AddressesRepo,
  ) { }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = new Address();

    address.description = createAddressDto.description;
    address.cep = createAddressDto.cep;
    address.neighborhood = createAddressDto.neighborhood;
    address.street = createAddressDto.street;
    address.addressNumber = createAddressDto.addressNumber;
    address.complement = createAddressDto.complement;

    address.school = new School();
    address.school.id = createAddressDto.school.id;

    return await this.addressesRepo.save(address);
  }

  async findSAddressById(addressId: string): Promise<Address> {
    const address = await this.addressesRepo.findOne(addressId);

    if (!address) throw new NotFoundException('Endereço não encontrado');

    return address;
  }

  async updateAddress(updateAddressDto: UpdateAddressDto, id: string): Promise<Address> {
    try {
      await this.addressesRepo.update(id, updateAddressDto);
      return await this.findSAddressById(id);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar endereço');
    }
  }

  async deleteAddress(addressId: string) {
    const result = await this.addressesRepo.delete({ id: addressId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um endereço com o ID informado',
      );
    }
  }

  async findAddresses(
    queryDto: FindAddressesQueryDto,
  ): Promise<{ addresses: Address[]; total: number }> {
    const addresses = await this.addressesRepo.findAdresses(queryDto);
    return addresses;
  }
}
