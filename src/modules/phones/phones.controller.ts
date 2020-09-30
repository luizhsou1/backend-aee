import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { UserRole } from '../users/user-roles.enum';
import { CreatePhoneDto } from './dtos/create-phone.dto';
import { FindPhonesQueryDto } from './dtos/find-phone-query.dto';
import { ReturPhoneDto } from './dtos/return-phone.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { PhonesService } from './phones.service';

@ApiTags('phones')
@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) { }

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createPhone(
    @Body(ValidationPipe) createPhoneDto: CreatePhoneDto,
  ): Promise<ReturPhoneDto> {
    const phone = await this.phonesService.createPhone(createPhoneDto);
    return {
      phone,
      message: 'Telefone cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findPhoneById(@Param('id') id: string): Promise<ReturPhoneDto> {
    const phone = await this.phonesService.findPhoneById(id);
    return {
      phone,
      message: 'Telefone encontrado',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updatePhone(
    @Body(ValidationPipe) updatePhoneDto: UpdatePhoneDto,
    @Param('id') id: string,
  ): Promise<ReturPhoneDto> {
    const phone = await this.phonesService.updatePhone(updatePhoneDto, id);
    return {
      phone,
      message: 'Telefone alterado com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async deletePhone(@Param('id') id: string) {
    await this.phonesService.deletePhone(id);
    return {
      message: 'Telefone removido com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findPhones(@Query() query: FindPhonesQueryDto) {
    const found = await this.phonesService.findPhones(query);
    return {
      ...found,
      message: 'Telefones encontrados',
    };
  }
}
