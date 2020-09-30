import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { AdressesService } from './adresses.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { FindAddressesQueryDto } from './dtos/find-addresses-query.dto';
import { ReturnAddressDto } from './dtos/return-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@ApiTags('adresses')
@Controller('adresses')
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) { }

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createAddress(
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    const address = await this.adressesService.createAddress(createAddressDto);
    return {
      address,
      message: 'Endereço cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findAddressById(@Param('id') id: string): Promise<ReturnAddressDto> {
    const address = await this.adressesService.findAddressById(id);
    return {
      address,
      message: 'Endereço encontrado',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateAddress(
    @Body(ValidationPipe) updateSchoolDto: UpdateAddressDto,
    @Param('id') id: string,
  ): Promise<ReturnAddressDto> {
    const address = await this.adressesService.updateAddress(updateSchoolDto, id);
    return {
      address,
      message: 'Endereço alterado com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async deleteAddress(@Param('id') id: string) {
    await this.adressesService.deleteAddress(id);
    return {
      message: 'Endereço removido com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findAddresses(@Query() query: FindAddressesQueryDto) {
    const found = await this.adressesService.findAddresses(query);
    return {
      ...found,
      message: 'Endereços encontrados',
    };
  }
}
