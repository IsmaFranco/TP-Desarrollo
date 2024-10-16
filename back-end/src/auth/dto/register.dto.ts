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
  //no estaria validando que cumpla con los datos
  @Transform(({ value }) => value.trim()) // esto sirve para que la contraseña no tenga espacios
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nameUs: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastNameUs: string;

  @IsEmail()
  emailUs: string;

  @Transform(({ value }) => value.trim()) // esto sirve para que la contraseña no tenga espacios
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  passwordUs: string;

  @IsInt()
  @IsPositive()
  dni: number;

  @IsString()
  @MaxLength(50)
  phoneUs: string; // ver como lo usaria con el +54 misma duda que con localidad y provincia

  @IsString()
  @MaxLength(50)
  addressUs: string;

  @IsInt()
  @IsPositive()
  postalCode: number;
}
