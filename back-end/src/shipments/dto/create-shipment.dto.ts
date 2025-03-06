import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsDate()
  dateSh: Date;

  @IsNumber()
  idLocality: number;

}