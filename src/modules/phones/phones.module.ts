import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesController } from './phones.controller';
import { PhonesRepo } from './phones.repository';
import { PhonesService } from './phones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhonesRepo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
