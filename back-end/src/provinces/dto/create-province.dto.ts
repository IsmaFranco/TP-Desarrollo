import { IsString, MinLength } from 'class-validator';

export class CreateProvinceDto {
  @IsString()
  @MinLength(2)
  namePr: string;
}
