import { IsString, MaxLength } from 'class-validator';
export class CreatePurchaseDto {
  @IsString()
  @MaxLength(200)
  observation: string;
  user: any;
}
