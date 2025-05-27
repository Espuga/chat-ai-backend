import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly token: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
