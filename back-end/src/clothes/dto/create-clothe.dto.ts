import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClotheDto {
    @IsString()
    @MinLength(1)
    @MaxLength(70)
    nameCl: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsString()
    @MaxLength(3)
    size: string;

    @IsString()
    @MaxLength(200)
    typeCl: string;

    @IsInt()
    @IsPositive()
    stock: number;

    @IsString()
    @MaxLength(700)
    image: string;

    @IsNumber()
    @IsPositive()
    price: number;
}
