import { IsString, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
