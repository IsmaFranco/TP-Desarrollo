import { IsEmail, IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  // Definimos los campos que se van a recibir en el body
  @IsString()
  @MaxLength(50)
  nameUs: string; // Nombre y apellido, cambiarlo o agregar columna

  @IsString() // ver si se le puede agregar el @varchar(50) o algo asi para que sea mas claro
  @MaxLength(50)
  lastNameUs: string; // Nombre y apellido, cambiarlo o agregar columna

  @IsEmail()
  @MaxLength(50)
  emailUs: string;

  @IsString()
  @MaxLength(50)
  @MinLength(6)
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

  /*locality: string;
  province: string;estos los deberia elegir, el usuario de una lista pq asumimos que ya esta cargado*/
  @IsInt()
  idLo: number;
}
