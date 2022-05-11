
   
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  line1!: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  @Length(2)
  country?: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  @IsString()
  @IsOptional()
  state?: string;
}

export class CreateBillingDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  promotion_code?: string;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  address?: Address;
}

export class UpdateBillingDto {
  @IsString()
  @IsOptional()
  default_source?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  promotion_code?: string;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  address?: Address;
}

export class ReplaceBillingDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsObject()
  @ValidateNested()
  address!: Address;
}

export class CreateProductDto{
  @IsString()
  name!: string;
  
  @IsString()
  description!: string;

  @IsString()
  images!: string;
}
  // currency: 'aud',
  // payment_method_types: ['card'],
export class CreatePaymentIntent {
  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  
  payment_method_types!: [];

}