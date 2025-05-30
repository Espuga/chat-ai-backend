import { IsOptional, IsString } from 'class-validator';

export class MessageDTO {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsString()
  readonly chat_id: string;

  @IsString()
  role: string;

  @IsString()
  message: string;
}
