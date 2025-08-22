import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateLocalityDto {
  @IsPositive()
  @IsInt()
  postalCode: number;

  @IsString()
  @MinLength(2)
  nameLo: string;
}
