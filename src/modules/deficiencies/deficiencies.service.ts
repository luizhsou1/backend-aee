import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleErrors } from 'src/shared/utils/errors-helper';
import { DeficienciesRepo } from './deficiencies.repository';
import { Deficiency } from './deficiency.entity';
import { CreateDeficiencyDto } from './dtos/create-deficiency.dto';
import { FindDeficienciesQueryDto } from './dtos/find-deficiencies-query.dto';
import { UpdateDeficiencyDto } from './dtos/update-deficiency.dto';

@Injectable()
export class DeficienciesService {
  constructor(
    @InjectRepository(DeficienciesRepo)
    private readonly deficienciesRepo: DeficienciesRepo,
  ) { }

  async createDeficiency(createDeficiencyDto: CreateDeficiencyDto): Promise<Deficiency> {
    const deficiency = new Deficiency();

    deficiency.name = createDeficiencyDto.name;

    return await this.deficienciesRepo.save(deficiency);
  }

  async findDeficiencyById(deficiencyId: string): Promise<Deficiency> {
    const deficiency = await this.deficienciesRepo.findOne(deficiencyId);

    if (!deficiency) throw new NotFoundException('Deficiência não encontrada');

    return deficiency;
  }

  async updateDeficiency(
    updateDeficiencyDto: UpdateDeficiencyDto,
    id: string,
  ): Promise<Deficiency> {
    try {
      await this.deficienciesRepo.update(id, updateDeficiencyDto);
      return await this.findDeficiencyById(id);
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar deficiência');
    }
  }

  async deleteDeficiency(deficiencyId: string) {
    const result = await this.deficienciesRepo.delete({ id: deficiencyId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma deficiência com o ID informado',
      );
    }
  }

  async findDeficiencies(
    queryDto: FindDeficienciesQueryDto,
  ): Promise<{ deficiencies: Deficiency[]; total: number }> {
    const deficiencies = await this.deficienciesRepo.findDeficiencies(queryDto);
    return deficiencies;
  }
}
