import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;
}
