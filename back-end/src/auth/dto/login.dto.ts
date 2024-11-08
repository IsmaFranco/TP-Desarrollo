import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class Logindto {
  //mismo error que en el register no lo estaria validando
  @IsEmail()
  emailUs: string;

  @Transform(({ value }) => value.trim()) // esto sirve para que la contraseña no tenga espacios
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  passwordUs: string;
}
