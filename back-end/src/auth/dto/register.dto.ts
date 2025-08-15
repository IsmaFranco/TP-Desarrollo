import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // esto sirve para que la contraseña no tenga espacios
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  nameUs: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastNameUs: string;

  @IsEmail()
  emailUs: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // esto sirve para que la contraseña no tenga espacios
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  passwordUs: string;

  @IsInt()
  @IsPositive()
  dni: number;

  @IsString()
  @MaxLength(50)
  phoneUs: string; 

  @IsString()
  @MaxLength(50)
  addressUs: string;

  @IsInt()
  idLo: number;

  //rol: Rol;
}
