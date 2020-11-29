import { School } from 'src/modules/schools/school.entity';
import { IsObjectWithId } from 'src/shared/custom-decorators/is-object-with-id';
import { IsAddressCep } from '../attributes/address-cep.decorator';
import { IsAddressCity } from '../attributes/address-city.decorator';
import { IsAddressComplement } from '../attributes/address-complement.decorator';
import { IsAddressDescription } from '../attributes/address-description.decorator';
import { IsAddressNeighborhood } from '../attributes/address-neighborhood.decorator';
import { IsAddressNumber } from '../attributes/address-number-house.decorator';
import { IsAddressStreet } from '../attributes/address-street.decorator';
import { IsAddressUf } from '../attributes/address-uf.decorator';

export class UpdateAddressDto {
  @IsAddressDescription(false)
  description: string;

  @IsAddressCep(false)
  cep: string;

  @IsAddressCity(false)
  city: string;

  @IsAddressUf(false)
  uf: string;

  @IsAddressNeighborhood(false)
  neighborhood: string;

  @IsAddressStreet(false)
  street: string;

  @IsAddressNumber(false)
  addressNumber: number;

  @IsAddressComplement(false)
  complement: string;

  @IsObjectWithId('school', false)
  school: School;
}