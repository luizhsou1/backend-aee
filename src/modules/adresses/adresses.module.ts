import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepo } from './addresses.repository';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressesRepo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AdressesController],
  providers: [AdressesService],
})
export class AdressesModule {}
