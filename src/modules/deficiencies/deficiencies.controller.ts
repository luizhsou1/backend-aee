import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/modules/users/user-roles.enum';
import { Auth } from 'src/shared/custom-decorators/auth.decorator';
import { DeficienciesService } from './deficiencies.service';
import { CreateDeficiencyDto } from './dtos/create-deficiency.dto';
import { FindDeficienciesQueryDto } from './dtos/find-deficiencies-query.dto';
import { ReturnDeficiencyDto } from './dtos/return-deficiency.dto';
import { UpdateDeficiencyDto } from './dtos/update-deficiency.dto';

@ApiTags('deficiencies')
@Controller('deficiencies')
export class DeficienciesController {
  constructor(private readonly deficienciesService: DeficienciesService) { }

  @Post()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async createDeficiency(
    @Body(ValidationPipe) createDeficiencyDto: CreateDeficiencyDto,
  ): Promise<ReturnDeficiencyDto> {
    const deficiency = await this.deficienciesService.createDeficiency(createDeficiencyDto);
    return {
      deficiency,
      message: 'Deficiência cadastrada com sucesso',
    };
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findDeficiencyById(@Param('id') id: string): Promise<ReturnDeficiencyDto> {
    const deficiency = await this.deficienciesService.findDeficiencyById(id);
    return {
      deficiency,
      message: 'Deficiência encontrada',
    };
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async updateDeficiency(
    @Body(ValidationPipe) updateDeficiencyDto: UpdateDeficiencyDto,
    @Param('id') id: string,
  ): Promise<ReturnDeficiencyDto> {
    const deficiency = await this.deficienciesService.updateDeficiency(updateDeficiencyDto, id);
    return {
      deficiency,
      message: 'Deficiência alterada com sucesso',
    };
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async deleteDeficiency(@Param('id') id: string) {
    await this.deficienciesService.deleteDeficiency(id);
    return {
      message: 'Deficiência removida com sucesso',
    };
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.SUPERVISOR)
  async findDeficiencies(@Query() query: FindDeficienciesQueryDto) {
    const found = await this.deficienciesService.findDeficiencies(query);
    return {
      ...found,
      message: 'Deficiências encontradoa',
    };
  }
}
